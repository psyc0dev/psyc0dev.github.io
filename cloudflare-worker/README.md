# psyc0dev — Contact Worker

The portfolio contact form POSTs to this Cloudflare Worker, which forwards the
message to the psyc0dev Telegram bot. No database, no dependencies beyond
wrangler.

## Where messages go

Telegram. You need two values:

- `TELEGRAM_BOT_TOKEN` — from @BotFather (the bot: @psyc0dev_bot)
- `TELEGRAM_CHAT_ID` — your chat id with that bot (send the bot any message,
  then read it via `getUpdates`, or use @userinfobot)

Messages arrive styled: name, email in monospace, the message itself in an
expandable blockquote, and the sender IP. No emojis.

## Deploy

```bash
cd cloudflare-worker
bunx wrangler login            # opens your Cloudflare account
echo "<bot-token>"  | bunx wrangler secret put TELEGRAM_BOT_TOKEN
echo "<chat-id>"    | bunx wrangler secret put TELEGRAM_CHAT_ID
bunx wrangler deploy
```

Wrangler prints the deployed URL, something like
`https://psyc0dev-contact.<your-subdomain>.workers.dev`. The form posts to
`<that-url>/submit`.

## Wire up the site

In `js/app.js` (repo root), set:

```js
const CONTACT_ENDPOINT = 'https://psyc0dev-contact.<your-subdomain>.workers.dev/submit';
```

Until it is set, submitting the form opens the visitor's mail client with the
message prefilled, so nothing silently disappears.

## Lock down (do this before going public)

In `cloudflare-worker/wrangler.toml`, replace the wildcard:

```toml
ALLOWED_ORIGIN = "https://psyc0dev.github.io"
```

and redeploy (`bunx wrangler deploy`). The worker also rate-limits to 5
submissions per IP per 10 minutes and ignores honeypot submissions.

## Local testing

```bash
cd cloudflare-worker
cp .dev.vars.example .dev.vars   # fill in real values
npx wrangler dev                 # serves http://localhost:8787
curl -X POST http://localhost:8787/submit -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@e.com","message":"hi"}'
```
