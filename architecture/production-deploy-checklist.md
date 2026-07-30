# Production Deploy Checklist

## Redirect Map

The staging service routes do not require redirects because they were not
published in production.

Activate this redirect only during the production cutover:

```text
/software-digital-shelf/  /servicios/digital-shelf/  301
```

Before enabling indexing:

- Confirm that `/servicios/digital-shelf/` returns `200`.
- Confirm that its canonical is `https://www.uhuragroup.com/servicios/digital-shelf/`.
- Confirm that sitemap and internal links use only the new URL.
- Activate the redirect before allowing both documents to be indexed.
- Verify that `/software-digital-shelf/` returns a single `301` hop to the new URL.

## Search Console and sitemaps

The Blog remains permanently on WordPress through the legacy origin. Old case
studies use that same origin only while their migration is pending.

After the production cutover:

- Submit `https://www.uhuragroup.com/sitemap.xml` for the new static site.
- Keep `https://www.uhuragroup.com/post-sitemap.xml` for the WordPress Blog.
- Keep `https://www.uhuragroup.com/resultados-sitemap.xml` only while legacy
  case studies remain unpublished on the new site.
- Remove `https://www.uhuragroup.com/sitemap_index.xml` from Search Console.
- Confirm that `/blog/`, two Blog posts and their media return `200`.
- Confirm that one unpublished legacy result returns `200`.
