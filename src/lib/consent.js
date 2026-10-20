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

let statisticsLoaded = false

export function applyConsent(data) {
  if (data?.statistics && !statisticsLoaded) {
    statisticsLoaded = true
    loadStatistics()
  }
}

// PLATZHALTER: Hier ein datenschutzfreundliches Statistik-Tool einbinden
// (z. B. selbst gehostetes Matomo oder Plausible). Wird erst nach Opt-in ausgeführt.
function loadStatistics() {
  // const s = document.createElement('script')
  // s.src = 'https://statistik.landwerker.ch/script.js'
  // s.defer = true
  // document.head.appendChild(s)
}
