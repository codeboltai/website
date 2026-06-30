# SEO And GEO

This site is optimized for both search engines and answer engines.

## Required Page Metadata

Every public page should include:

- A specific `<title>`.
- A short `<meta name="description">`.
- A canonical URL.
- Open Graph metadata.
- Twitter card metadata.
- Structured data when the page describes Codebolt or a product surface.

## Required Crawler Files

The active public crawler files live in `newsite/public/` and are copied to `newsite/dist/` during the Astro build:

- `newsite/public/robots.txt`
- `newsite/public/sitemap.xml`
- `newsite/public/llms.txt`
- `newsite/public/ai.txt`

Keep these files aligned with homepage positioning whenever product messaging changes.

## Performance Notes

Use compressed static screenshots where possible. The hero CLI preview should use `images/cli-1.png` rather than the larger animated GIF unless animation is explicitly required.
