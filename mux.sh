#!/bin/bash
# mux.sh <clip> <audio.wav>
# Trims the recording's lead-in, linearly corrects any capture drift so the
# video's wall-clock timeline matches exactly, then muxes the voice-over.
set -euo pipefail
cd "$(dirname "$0")"
CLIP="$1"
AUDIO="$2"

LEAD=$(python3 -c "import json;print(json.load(open('clips/$CLIP.json'))['leadIn'])")
WALL=$(python3 -c "import json;print(json.load(open('clips/$CLIP.json'))['timelineSec'])")
RAW=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "clips/$CLIP.webm")
ADUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUDIO")

# What the capture actually produced for the timeline portion, vs what the
# wall clock says it should be. Playwright's frame stream is not perfectly
# real-time, so rescale rather than assume.
CAPTURED=$(python3 -c "print(round($RAW - $LEAD, 3))")
RATE=$(python3 -c "print(round($WALL / $CAPTURED, 6))")

echo "  lead-in    ${LEAD}s"
echo "  raw video  ${RAW}s  ->  captured timeline ${CAPTURED}s"
echo "  wall clock ${WALL}s  ->  pts rate ${RATE}"
echo "  audio      ${ADUR}s"

mkdir -p final
# -ss before -i seeks fast; re-encoding anyway so accuracy is frame-exact.
ffmpeg -y -loglevel error \
  -ss "$LEAD" -i "clips/$CLIP.webm" \
  -i "$AUDIO" \
  -filter_complex "[0:v]setpts=PTS*${RATE},fps=30[v]" \
  -map "[v]" -map 1:a \
  -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p \
  -c:a aac -b:a 128k -shortest -movflags +faststart \
  "final/$CLIP.mp4"

OUT=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "final/$CLIP.mp4")
echo "  final      ${OUT}s  ->  final/$CLIP.mp4"
