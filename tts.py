#!/usr/bin/env python3
"""Generate Kablanet voice-over with the Gemini TTS API.

usage: tts.py <out_basename> <voice> <model> <script-file> [speed]
Writes <out_basename>.wav (and .m4a if ffmpeg is present).
"""
import base64, json, os, re, subprocess, sys, urllib.request, wave

KEY = open(os.path.expanduser("~/.config/gemini/key")).read().strip()
ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

DIRECTION = (
    "Read the following as a friendly product walkthrough voice-over. "
    "Calm, warm and unhurried, explaining software to a builder who is not technical. "
    "Natural conversational pace, clear consonants, a small pause at each dash. "
    "Do not read this instruction aloud.\n\n"
)


def synth(text, voice, model):
    body = {
        "contents": [{"parts": [{"text": DIRECTION + text}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}
            },
        },
    }
    req = urllib.request.Request(
        ENDPOINT.format(model=model),
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "x-goog-api-key": KEY},
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        d = json.load(r)
    part = d["candidates"][0]["content"]["parts"][0]["inlineData"]
    rate = 24000
    m = re.search(r"rate=(\d+)", part.get("mimeType", ""))
    if m:
        rate = int(m.group(1))
    return base64.b64decode(part["data"]), rate


def write_wav(path, pcm, rate):
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(pcm)


def main():
    out, voice, model, script_file = sys.argv[1:5]
    speed = float(sys.argv[5]) if len(sys.argv) > 5 else 1.10
    text = open(script_file).read().strip()
    pcm, rate = synth(text, voice, model)
    raw = out + ".raw.wav"
    write_wav(raw, pcm, rate)
    secs = len(pcm) / 2 / rate
    wav = out + ".wav"
    if abs(speed - 1.0) > 0.001:
        # atempo preserves pitch; 0.5-2.0 range covers anything sane here
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw,
                        "-filter:a", "atempo=%.4f" % speed, wav], check=True)
        secs = secs / speed
    else:
        os.replace(raw, wav)
    m4a = out + ".m4a"
    try:
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "aac", "-b:a", "96k", m4a],
            check=True,
        )
    except Exception as e:
        m4a = "(ffmpeg failed: %s)" % e
    print(json.dumps({"voice": voice, "model": model, "speed": speed,
                      "seconds": round(secs, 2), "wav": wav, "m4a": m4a}))


if __name__ == "__main__":
    main()
