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
