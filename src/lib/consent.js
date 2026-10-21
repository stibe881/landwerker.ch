// Einwilligungsverwaltung nach revDSG/DSGVO: Opt-in, jederzeit widerrufbar.
// Ohne Einwilligung werden keine Statistik- oder Marketingdienste geladen.

const KEY = 'lw-consent'
const VERSION = 1
const OPEN_EVENT = 'lw:open-consent'

export function readConsent() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return data.version === VERSION ? data : null
  } catch {
    return null
  }
}

export function saveConsent({ statistics }) {
  const data = { version: VERSION, necessary: true, statistics: !!statistics, date: new Date().toISOString() }
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // Speicher blockiert: Entscheid gilt nur für diese Sitzung
  }
  applyConsent(data)
  return data
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onOpenConsentSettings(handler) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}

// Google Analytics 4. Mess-ID über VITE_GA_ID (z. B. G-XXXXXXXXXX) beim Build setzen.
// Ohne ID wird nichts geladen. Das Skript wird erst nach Opt-in eingefügt (keine Vorab-Anfrage an Google).
const GA_ID = import.meta.env.VITE_GA_ID
let statisticsLoaded = false

export function applyConsent(data) {
  if (!GA_ID) return
  if (data?.statistics) {
    window[`ga-disable-${GA_ID}`] = false
    if (!statisticsLoaded) {
      statisticsLoaded = true
      loadStatistics()
    }
  } else {
    revokeStatistics()
  }
}

function loadStatistics() {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(s)
}

// Widerruf: weitere Messung sofort stoppen und die Analytics-Cookies löschen
function revokeStatistics() {
  window[`ga-disable-${GA_ID}`] = true
  const host = location.hostname.split('.').slice(-2).join('.')
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_')) {
      for (const domain of ['', `; domain=.${host}`, `; domain=${location.hostname}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
      }
    }
  })
}
