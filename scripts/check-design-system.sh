#!/usr/bin/env bash

set -u

if [ "$#" -eq 0 ]; then
  echo "Usage: scripts/check-design-system.sh <new-page-or-local-css> [...]"
  exit 2
fi

status=0

report_matches() {
  local label="$1"
  local pattern="$2"
  local file="$3"
  local matches

  matches="$(rg -n --pcre2 "$pattern" "$file" 2>/dev/null || true)"
  if [ -n "$matches" ]; then
    echo
    echo "[$label] $file"
    echo "$matches"
    status=1
  fi
}

for file in "$@"; do
  if [ ! -f "$file" ]; then
    echo "[missing] $file"
    status=1
    continue
  fi

  report_matches \
    "local typography" \
    '(?:font-size|line-height|letter-spacing)\s*:|clamp\s*\(' \
    "$file"

  report_matches \
    "inline typography" \
    'style\s*=\s*["'"'"'][^"'"'"']*(?:font-size|line-height|letter-spacing)' \
    "$file"

  report_matches \
    "local component definition" \
    '\.(?:button-[A-Za-z0-9_-]+|uhura-card(?:--|__)?[A-Za-z0-9_-]*)\s*\{' \
    "$file"

  report_matches \
    "forbidden compact hierarchy" \
    'class\s*=\s*["'"'"'][^"'"'"']*(?:uhura-card|sidebar|metric)[^"'"'"']*(?:display-title|hero-base__title|section-title|editorial-title|narrative-title)|class\s*=\s*["'"'"'][^"'"'"']*(?:display-title|hero-base__title|section-title|editorial-title|narrative-title)[^"'"'"']*(?:uhura-card|sidebar|metric)' \
    "$file"
done

if [ "$status" -eq 0 ]; then
  echo "Design System guardrail: clean."
else
  echo
  echo "Design System guardrail: review required."
fi

exit "$status"
