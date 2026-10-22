#!/bin/bash
# Build the resume with private info (photo, phone, birth date) and print it to a PDF on this Mac only.
# Needs _data/private.yml + assets/private/ (both gitignored) and local Jekyll in ~/.jekyll-gems (FOR_ME.md 10).
# Usage: .github/scripts/private_resume.sh [output.pdf]
set -e
cd "$(dirname "$0")/../.."
[ -f _data/private.yml ] || { echo "_data/private.yml not found"; exit 1; }

OUT="${1:-$HOME/Desktop/김현지_이력서.pdf}"
SITE=$(mktemp -d)
GEM_HOME=~/.jekyll-gems JEKYLL_ENV=private ~/.jekyll-gems/bin/jekyll build -q -d "$SITE"

(cd "$SITE" && exec python3 -m http.server 4124 >/dev/null 2>&1) &
SERVER=$!
trap 'kill $SERVER 2>/dev/null; rm -rf "$SITE"' EXIT
sleep 1

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --virtual-time-budget=5000 --print-to-pdf="$OUT" http://localhost:4124/resume/ 2>/dev/null
echo "saved: $OUT"
