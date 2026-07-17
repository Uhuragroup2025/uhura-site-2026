#!/usr/bin/env bash
set -euo pipefail

project="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output="$project/dist"

rm -rf "$output"
mkdir -p "$output/client/__content/casos" "$output/client/__content/servicios" "$output/server"

# Documents live behind non-public asset names so every page request reaches
# the Worker first and receives the staging X-Robots-Tag header.
cp "$project/index.html" "$output/client/__content/index.page"
cp "$project/nosotros.html" "$output/client/__content/nosotros.page"
cp "$project/casos/kaiowa.html" "$output/client/__content/casos/kaiowa.page"
cp "$project/servicios/producto-digital.html" "$output/client/__content/servicios/producto-digital.page"
cp "$project/servicios/growth.html" "$output/client/__content/servicios/growth.page"
cp "$project/servicios/creatividad.html" "$output/client/__content/servicios/creatividad.page"
cp "$project/servicios/ai-agents.html" "$output/client/__content/servicios/ai-agents.page"
cp "$project/robots.txt" "$output/client/__content/robots.data"
cp "$project/sitemap.xml" "$output/client/__content/sitemap.data"
cp "$project/_headers" "$output/client/_headers"
cp -R "$project/assets" "$output/client/assets"
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
