/**
 * psyc0dev — Contact form worker.
 *
 * Receives the portfolio contact form as JSON and forwards it to the
 * psyc0dev Telegram bot.
 *
 * Secrets (set with `npx wrangler secret put <NAME>` or bunx):
 *   TELEGRAM_BOT_TOKEN - bot token from @BotFather
 *   TELEGRAM_CHAT_ID   - your chat id with that bot
 * Optional:
 *   ALLOWED_ORIGIN - comma-separated origin list (default: *)
 *
 * See README.md for setup.
 */

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT = 5;
const RATE_WINDOW = 10 * 60 * 1000; // 10 minutes

// Per-isolate memory: resets now and then, but stops the laziest spam bursts.
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function corsHeaders(request, env) {
  const allowed = (env.ALLOWED_ORIGIN || '*')
    .split(',')
    .map((o) => o.trim());
  const origin = request.headers.get('Origin') || '';
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (allowed.includes('*')) {
    headers['Access-Control-Allow-Origin'] = '*';
  } else if (allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  }
  return headers;
}

function json(data, status, request, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(request, env) },
  });
}

function truncate(text, max) {
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendToTelegram(env, data, ip) {
  const telegramLine = data.telegram
    ? '\n<b>Telegram:</b> <a href="https://t.me/' +
      data.telegram +
      '">@' +
      escapeHtml(data.telegram) +
      '</a>'
    : '';

  const text = [
    '<b>psyc0dev portfolio · new message</b>',
    '<b>From:</b> ' + escapeHtml(data.name),
    '<b>Email:</b> <a href="mailto:' +
      escapeHtml(data.email) +
      '"><code>' +
      escapeHtml(data.email) +
      '</code></a>',
    telegramLine,
    '',
    '<blockquote expandable>' +
      escapeHtml(truncate(data.message, 3000)) +
      '</blockquote>',
    '',
    '<i>ip: <tg-spoiler>' + escapeHtml(ip) + '</tg-spoiler> · via the site form</i>',
  ].join('\n');

  const res = await fetch(
    'https://api.telegram.org/bot' + env.TELEGRAM_BOT_TOKEN + '/sendMessage',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: truncate(text, 4000),
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
      }),
    }
  );
  if (!res.ok) throw new Error('telegram responded ' + res.status);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request, env),
      });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/submit' || request.method !== 'POST') {
      return json({ ok: false, error: 'Not found' }, 404, request, env);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return json(
        { ok: false, error: 'Too many requests, try again later' },
        429,
        request,
        env
      );
    }

    let data;
    try {
      data = await request.json();
    } catch (e) {
      data = null;
    }

    // Honeypot field must stay empty; bots fill it, humans never see it.
    if (!data || typeof data !== 'object' || data._gotcha) {
      return json({ ok: false, error: 'Invalid submission' }, 400, request, env);
    }

    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const telegram = String(data.telegram || '')
      .trim()
      .replace(/^@+/, '');
    const message = String(data.message || '').trim();

    if (!name || name.length > 100) {
      return json({ ok: false, error: 'Invalid name' }, 400, request, env);
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return json({ ok: false, error: 'Invalid email' }, 400, request, env);
    }
    if (telegram && !/^[A-Za-z0-9_]{4,32}$/.test(telegram)) {
      return json({ ok: false, error: 'Invalid telegram username' }, 400, request, env);
    }
    if (!message || message.length > 5000) {
      return json({ ok: false, error: 'Invalid message' }, 400, request, env);
    }

    const clean = { name, email, telegram, message };
    const errors = [];
    let delivered = false;

    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      try {
        await sendToTelegram(env, clean, ip);
        delivered = true;
      } catch (e) {
        errors.push(String(e.message || e));
      }
    }

    if (!delivered) {
      return json(
        {
          ok: false,
          error:
            errors[0] ||
            'Not configured: set TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID',
        },
        500,
        request,
        env
      );
    }

    return json({ ok: true }, 200, request, env);
  },
};
