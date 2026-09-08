# Devcon1 Solutions site

Next.js (App Router) + TypeScript static site for [devcon1solutions.com](https://devcon1solutions.com).

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → build/
npm run deploy   # build + firebase deploy
```

## Environment

Copy `.env.local.example` → `.env.local` and set `NEXT_PUBLIC_API_KEY` to a key created in the API console.

## Console

Admin UI lives at `/console` (setup, login, MFA, API keys, mailer, templates).

See API docs:

- `../devcon1solutions-api/docs/CONSOLE.md`
- `../devcon1solutions-api/docs/CONTACT_API.md`
- `../devcon1solutions-api/docs/ENVIRONMENT.md`

## Local API

1. Run MongoDB + `npm run server` in `devcon1solutions-api/functions`
2. Set `USE_LOCAL_API = true` in `src/lib/server.ts`
3. `src/config.json` `dev` should be `http://localhost:5050`
