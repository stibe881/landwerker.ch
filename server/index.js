// Produktionsserver: liefert den Build aus und nimmt Kontaktanfragen entgegen.
// Start: npm run build && npm start
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const PORT = Number(process.env.PORT) || 8787
const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const MAIL_TO = process.env.MAIL_TO || 'stefanmoeckli@landwerker.ch'

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Content-Security-Policy':
    // Google Analytics wird nur nach Einwilligung geladen, muss aber hier erlaubt sein
    "default-src 'self'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' https://www.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-ancestors 'self'",
}

const transport = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null

// Einfache Drosselung: max. 5 Anfragen pro IP und Stunde
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < 3_600_000)
  list.push(now)
  hits.set(ip, list)
  return list.length > 5
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...SECURITY_HEADERS, ...headers })
  res.end(body)
}

async function readJson(req) {
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > 20_000) throw new Error('too large')
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

async function handleContact(req, res) {
  const ip = req.socket.remoteAddress || ''
  if (limited(ip)) return send(res, 429, JSON.stringify({ error: 'rate_limited' }), { 'Content-Type': 'application/json' })

  let data
  try {
    data = await readJson(req)
  } catch {
    return send(res, 400, JSON.stringify({ error: 'invalid' }), { 'Content-Type': 'application/json' })
  }

  // Honeypot: Bots füllen das versteckte Feld aus. Still annehmen, nicht weiterleiten.
  if (str(data.website, 200)) return send(res, 202, '{}', { 'Content-Type': 'application/json' })

  const entry = {
    name: str(data.name, 200),
    email: str(data.email, 200),
    phone: str(data.phone, 50),
    location: str(data.location, 200),
    topic: str(data.topic, 100),
    message: str(data.message, 5000),
  }
  const errors = []
  if (!entry.name) errors.push('name')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) errors.push('email')
  if (entry.message.length < 10) errors.push('message')
  // Ohne ausdrückliche Einwilligung wird nichts bearbeitet (revDSG/DSGVO)
  if (data.consent !== true) errors.push('consent')
  if (errors.length) return send(res, 422, JSON.stringify({ errors }), { 'Content-Type': 'application/json' })

  const text = [
    `Name: ${entry.name}`,
    `E-Mail: ${entry.email}`,
    `Telefon: ${entry.phone || '-'}`,
    `Ort: ${entry.location || '-'}`,
    `Thema: ${entry.topic || '-'}`,
    `Einwilligung Datenschutz: ja, ${new Date().toISOString()}`,
    '',
    entry.message,
  ].join('\n')

  if (transport) {
    try {
      await transport.sendMail({
        from: process.env.MAIL_FROM || MAIL_TO,
        to: MAIL_TO,
        replyTo: entry.email,
        subject: `Projektanfrage: ${entry.topic || 'Allgemein'} – ${entry.name}`,
        text,
      })
    } catch (err) {
      console.error('Mailversand fehlgeschlagen:', err.message)
      return send(res, 502, JSON.stringify({ error: 'mail_failed' }), { 'Content-Type': 'application/json' })
    }
  } else {
    // Entwicklung: Anfrage nur im Terminal ausgeben, nichts speichern
    console.info('--- Kontaktanfrage (SMTP nicht konfiguriert) ---\n' + text)
  }
  send(res, 200, JSON.stringify({ ok: true }), { 'Content-Type': 'application/json' })
}

async function serveStatic(req, res) {
  const url = new URL(req.url, 'http://localhost')
  let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '')
  let file = join(DIST, path)
  if (!file.startsWith(DIST)) return send(res, 403, 'Forbidden')
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
  } catch {
    file = join(DIST, 'index.html') // SPA-Fallback für /impressum, /datenschutz
  }
  try {
    const body = await readFile(file)
    const ext = extname(file)
    const cache = file.includes(`${DIST}assets`) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600'
    send(res, 200, body, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': cache })
  } catch {
    send(res, 404, 'Not found')
  }
}

createServer((req, res) => {
  if (req.url === '/api/contact' && req.method === 'POST') return handleContact(req, res)
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed')
  return serveStatic(req, res)
}).listen(PORT, () => console.log(`Landwerker läuft auf http://localhost:${PORT}`))
