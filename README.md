# Popoyo Concierge

Static landing site for **concierge.popoyo.co** — a one-message concierge service in Popoyo, Nicaragua.

Sister site to [moto.popoyo.co](https://moto.popoyo.co) (Karen & JJ Moto Rental).

## Stack
- Plain HTML / CSS / JS — no build step.
- Hosted on GitHub Pages, deployed straight from `main` branch root (same pattern as `cash.popoyo.co`).
- Custom domain via `CNAME` file.

## Local preview
```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Edit content
- Services list: `index.html` — search for `service-grid`.
- Reviews: `script.js` — `REVIEWS` array. Pulled from Karen & JJ Moto Rental's Google reviews; replace once concierge has its own.
- Contact (Karen's WhatsApp, email): `index.html` — search for `wa.me/50589750052` and `concierge@popoyo.co`.

## Deploy
Pushes to `main` go live automatically. To set up:

1. `gh repo create jjanczyszyn/concierge --public --source=. --remote=origin --push`
2. Repo Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/`.
3. Add DNS record at popoyo.co provider:
   - `concierge` CNAME → `jjanczyszyn.github.io`
4. Settings → Pages → custom domain: `concierge.popoyo.co`, enforce HTTPS.
