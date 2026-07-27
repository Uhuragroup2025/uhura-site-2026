#!/usr/bin/env bash
set -euo pipefail

project="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output="$project/dist"

required_assets=(
  "assets/services/previews/creatividad-uhura.png"
  "assets/services/previews/growth-uhura.jpg"
  "assets/services/previews/producto-digital-uhura.png"
  "assets/illustrations/uhura-web-people.png"
  "assets/media/creatividad-uhura-campanas.mp4"
  "assets/media/manifiesto-uhura-web.mp4"
  "assets/cases/cristar/orders-chart.png"
)

for asset in "${required_assets[@]}"; do
  if test ! -f "$project/$asset"; then
    echo "Missing required release asset: $asset" >&2
    exit 2
  fi
done

rm -rf "$output"
mkdir -p \
  "$output/casos" \
  "$output/casos-de-exito/cristar" \
  "$output/contacto" \
  "$output/servicios/websites-ecommerce" \
  "$output/servicios/brand-content" \
  "$output/servicios/seo-growth" \
  "$output/servicios/digital-shelf"

# Cloudflare Pages publishes this directory directly, so documents retain
# their public names and paths at the root of the artifact.
cp "$project/index.html" "$output/index.html"
cp "$project/nosotros.html" "$output/nosotros.html"
cp "$project/casos/kaiowa.html" "$output/casos/kaiowa.html"
cp "$project/casos-de-exito/cristar/index.html" "$output/casos-de-exito/cristar/index.html"
cp "$project/contacto/index.html" "$output/contacto/index.html"
cp "$project/servicios/websites-ecommerce/index.html" "$output/servicios/websites-ecommerce/index.html"
cp "$project/servicios/brand-content/index.html" "$output/servicios/brand-content/index.html"
cp "$project/servicios/seo-growth/index.html" "$output/servicios/seo-growth/index.html"
cp "$project/servicios/digital-shelf/index.html" "$output/servicios/digital-shelf/index.html"
cp "$project/servicios/ai-agents.html" "$output/servicios/ai-agents.html"
cp "$project/robots.txt" "$output/robots.txt"
cp "$project/sitemap.xml" "$output/sitemap.xml"
cp "$project/_headers" "$output/_headers"
cp -R "$project/assets" "$output/assets"
cp -R "$project/src" "$output/src"
find "$output" -name .DS_Store -type f -delete

while IFS= read -r ignored; do
  ignored="${ignored%/}"
  test -z "$ignored" && continue
  if test -e "$output/$ignored"; then
    echo "Excluded path was copied: $ignored" >&2
    exit 2
  fi
done < "$project/.assetsignore"

test -f "$output/index.html"
cmp -s "$project/index.html" "$output/index.html"
test -f "$output/nosotros.html"
test -f "$output/casos/kaiowa.html"
test -f "$output/casos-de-exito/cristar/index.html"
test -f "$output/contacto/index.html"
test -f "$output/servicios/websites-ecommerce/index.html"
test -f "$output/servicios/brand-content/index.html"
test -f "$output/servicios/seo-growth/index.html"
test -f "$output/servicios/digital-shelf/index.html"
test -f "$output/_headers"
grep -q "X-Robots-Tag: noindex, nofollow" "$output/_headers"

printf '%s\n' "$output"
