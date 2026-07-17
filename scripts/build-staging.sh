#!/usr/bin/env bash
set -euo pipefail

project="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output="$project/dist"

rm -rf "$output"
mkdir -p "$output/client" "$output/server"

cp "$project/index.html" "$output/client/index.html"
cp "$project/nosotros.html" "$output/client/nosotros.html"
cp "$project/robots.txt" "$output/client/robots.txt"
cp "$project/sitemap.xml" "$output/client/sitemap.xml"
cp "$project/_headers" "$output/client/_headers"
cp -R "$project/assets" "$output/client/assets"
cp -R "$project/casos" "$output/client/casos"
cp -R "$project/servicios" "$output/client/servicios"
cp -R "$project/src" "$output/client/src"
cp "$project/scripts/static-worker.js" "$output/server/index.js"

while IFS= read -r ignored; do
  ignored="${ignored%/}"
  test -z "$ignored" && continue
  if test -e "$output/client/$ignored"; then
    echo "Excluded path was copied: $ignored" >&2
    exit 2
  fi
done < "$project/.assetsignore"

test -f "$output/client/_headers"
grep -q "X-Robots-Tag: noindex, nofollow" "$output/client/_headers"
test -f "$output/server/index.js"

printf '%s\n' "$output"
