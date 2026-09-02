#!/usr/bin/env python3
"""Build one chapter's voice-over from a beat manifest.

usage: gen_chapter.py <chapter> <beats.json>
  beats.json: [[beat_id, text], ...]

Synthesizes any missing vo/beats/<id>.wav (skips ones that already exist —
safe to re-run after adding beats), concatenates with a 350ms gap between
each, writes vo/<chapter>_final.wav, and records actual cue start/end times
into vo/timeline.json + vo/beats/manifest.json.
"""
import sys, os, json, subprocess

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tts import synth, write_wav

VOICE = "Sulafat"
MODEL = "gemini-3.1-flash-tts-preview"
SPEED = 1.10
ROOT = os.path.dirname(os.path.abspath(__file__))
BEATS_DIR = os.path.join(ROOT, "vo", "beats")
GAP = os.path.join(BEATS_DIR, "_gap.wav")


def duration(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def synth_beat(beat_id, text):
    wav_path = os.path.join(BEATS_DIR, f"{beat_id}.wav")
    if os.path.exists(wav_path):
        return wav_path
    raw_path = os.path.join(BEATS_DIR, f"{beat_id}.raw.wav")
    pcm, rate = synth(text, VOICE, MODEL)
    write_wav(raw_path, pcm, rate)
    if abs(SPEED - 1.0) > 0.001:
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", raw_path, "-filter:a", f"atempo={SPEED:.4f}", wav_path],
            check=True,
        )
    else:
        os.replace(raw_path, wav_path)
    with open(os.path.join(BEATS_DIR, f"{beat_id}.txt"), "w") as f:
        f.write(text)
    return wav_path


def main():
    chapter = sys.argv[1]
    beats = json.load(open(sys.argv[2]))
    os.makedirs(BEATS_DIR, exist_ok=True)

    wavs, cues, t = [], [], 0.0
    for i, (bid, text) in enumerate(beats):
        wav = synth_beat(bid, text)
        dur = duration(wav)
        cues.append({"beat": bid, "start": round(t, 3), "end": round(t + dur, 3), "text": text})
        wavs.append(wav)
        t += dur
        if i < len(beats) - 1:
            t += duration(GAP)

    listfile = os.path.join(BEATS_DIR, f"_{chapter}_concat.txt")
    with open(listfile, "w") as f:
        for i, w in enumerate(wavs):
            f.write(f"file '{w}'\n")
            if i < len(wavs) - 1:
                f.write(f"file '{GAP}'\n")

    out_wav = os.path.join(ROOT, "vo", f"{chapter}_final.wav")
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listfile, "-c", "copy", out_wav],
        check=True,
    )
    total = duration(out_wav)

    tl_path = os.path.join(ROOT, "vo", "timeline.json")
    tl = json.load(open(tl_path)) if os.path.exists(tl_path) else {}
    tl[chapter] = {"total": round(total, 3), "cues": cues}
    json.dump(tl, open(tl_path, "w"), indent=1)

    man_path = os.path.join(BEATS_DIR, "manifest.json")
    man = json.load(open(man_path)) if os.path.exists(man_path) else {}
    man[chapter] = beats
    json.dump(man, open(man_path, "w"), indent=1)

    print(json.dumps({"chapter": chapter, "total": round(total, 3), "cues": cues}))


if __name__ == "__main__":
    main()
