# Deploying ENVELOPE 01 to Cloudflare Pages

Static Vite + React build. No server code, no environment variables, no bindings.

| Setting       | Value                                              |
| ------------- | -------------------------------------------------- |
| Build command | `npm run build`                                     |
| Build output  | `dist`                                              |
| Node version  | 22 (`.node-version`)                                |
| Project name  | `envelope01` (must match `name` in `wrangler.toml`) |
| Live domain   | `envelope01.com`                                    |

## Option A — Git integration (recommended)

Pushes deploy automatically, with preview URLs per branch.

1. Push this folder to a GitHub/GitLab repo (it is not yet a git repo):

```bash
git init && git add -A && git commit -m "ENVELOPE 01 website"
```

2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Pick the repo. The build command and output directory are read from
   `wrangler.toml`; confirm they match the table above.
4. Deploy. The site lands on `https://envelope01.pages.dev`.

## Option B — Direct upload from this machine

No repo required. Wrangler is already a devDependency.

```bash
npx wrangler login
```

```bash
npm run deploy
```

`npm run deploy` runs `vite build` then `wrangler pages deploy`, which reads
`pages_build_output_dir` from `wrangler.toml`. The first run offers to create
the Pages project.

## Custom domain — envelope01.com

1. Add `envelope01.com` as a zone in Cloudflare (dashboard → Add a site), then
   point the registrar's nameservers at the two Cloudflare gives you. Skip this
   if the domain is already on Cloudflare.
2. Pages project → Custom domains → Set up a domain → `envelope01.com`. With
   the zone on Cloudflare the DNS record is created for you and TLS is issued
   automatically.
3. Repeat for `www.envelope01.com` if you want it reachable — Cloudflare will
   redirect it to the apex.

`index.html` already declares `https://envelope01.com/` as the canonical and
`og:url`, and `public/sitemap.xml` and `public/robots.txt` use the same origin.
If the live host ever differs, update those four places together.

Social previews still have no image: add an `og:image` pointing at an absolute
URL (e.g. `https://envelope01.com/og.jpg`) once artwork exists, and drop the
file in `public/`.

## What is configured

- `public/_headers` — security headers (CSP, nosniff, frame-deny,
  referrer/permissions policy) on every route, plus one-year immutable caching
  on `/assets/*` (filenames are content-hashed). Fonts (IBM Plex Sans Arabic,
  IBM Plex Mono) are self-hosted via `@fontsource`, so `style-src`/`font-src`
  are just `'self'` — no Google Fonts allowlist needed.
- `public/robots.txt` — allows all crawlers, points at the sitemap.
- `public/sitemap.xml` — one `<url>` per locale (`/en/`, `/ar/`), each with an
  `xhtml:link` cross-referencing its counterpart.
- `public/favicon.svg` — monogram mark, referenced from `index.html`.
- `public/_redirects` — `/ /en/ 302`, the only route on the site that isn't
  `/en/…` or `/ar/…`.
- `.node-version` — pins the Pages builder to Node 22 (Vite 7 needs ≥20.19).

## Verifying locally

Serves `dist` through the real Pages runtime, so `_headers` applies:

```bash
npx wrangler pages dev dist
```
