#!/usr/bin/env bash
set -euo pipefail

project="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output="$project/dist"
deploy_env="${UHURA_DEPLOY_ENV:-staging}"

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
  "$output/nosotros" \
  "$output/resultados/kaiowa" \
  "$output/resultados/tienda-cristar" \
  "$output/contacto" \
  "$output/servicios/websites-ecommerce" \
  "$output/servicios/brand-content" \
  "$output/servicios/seo-growth" \
  "$output/servicios/digital-shelf"

# Cloudflare Pages publishes this directory directly, so documents retain
# their public names and paths at the root of the artifact.
cp "$project/index.html" "$output/index.html"
cp "$project/nosotros/index.html" "$output/nosotros/index.html"
cp "$project/resultados/kaiowa/index.html" "$output/resultados/kaiowa/index.html"
cp "$project/resultados/tienda-cristar/index.html" "$output/resultados/tienda-cristar/index.html"
cp "$project/contacto/index.html" "$output/contacto/index.html"
cp "$project/servicios/websites-ecommerce/index.html" "$output/servicios/websites-ecommerce/index.html"
cp "$project/servicios/brand-content/index.html" "$output/servicios/brand-content/index.html"
cp "$project/servicios/seo-growth/index.html" "$output/servicios/seo-growth/index.html"
cp "$project/servicios/digital-shelf/index.html" "$output/servicios/digital-shelf/index.html"
cp "$project/robots.txt" "$output/robots.txt"
cp "$project/sitemap.xml" "$output/sitemap.xml"
cp "$project/_redirects" "$output/_redirects"
if test "$deploy_env" = "production"; then
  cp "$project/_headers.production" "$output/_headers"
  cp "$project/scripts/cloudflare-pages-worker.js" "$output/_worker.js"
else
  cp "$project/_headers" "$output/_headers"
fi
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
test -f "$output/nosotros/index.html"
test -f "$output/resultados/kaiowa/index.html"
test -f "$output/resultados/tienda-cristar/index.html"
test -f "$output/contacto/index.html"
test -f "$output/servicios/websites-ecommerce/index.html"
test -f "$output/servicios/brand-content/index.html"
test -f "$output/servicios/seo-growth/index.html"
test -f "$output/servicios/digital-shelf/index.html"
test -f "$output/_headers"
test -f "$output/_redirects"
if test "$deploy_env" = "production"; then
  test -f "$output/_worker.js"
  if grep -q "X-Robots-Tag: noindex, nofollow" "$output/_headers"; then
    echo "Production headers must not include a global noindex directive." >&2
    exit 2
  fi
else
  grep -q "X-Robots-Tag: noindex, nofollow" "$output/_headers"
fi

printf '%s\n' "$output"
