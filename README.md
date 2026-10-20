# landwerker.ch

Website der Landwerker GmbH, Menznau. Holzbau und PV-Anlagen.
React 19, Vite, Tailwind CSS 4, kleiner Node-Server für das Kontaktformular.

## Entwicklung

```bash
npm install
npm run dev          # Frontend auf http://localhost:5173
node server/index.js # API auf :8787 (Vite leitet /api dorthin weiter)
```

## Produktion

```bash
npm run build
SMTP_HOST=… SMTP_USER=… SMTP_PASS=… MAIL_TO=stefanmoeckli@landwerker.ch npm start
```

Ohne `SMTP_HOST` werden Anfragen nur im Terminal ausgegeben und nicht gespeichert.

`npm run build:preview` erzeugt eine statische Vorschau ohne Server (`dist-preview/`).
Das Formular validiert dort, versendet aber nichts.

## Inhalte pflegen

Alle Texte, Kontaktdaten und Referenzen stehen in `src/content.js`.
Neue Referenzbilder als WebP nach `public/media/work/` legen und in `projects` eintragen, mit Alt-Text.

## Recht und Barrierefreiheit

- Cookie-Banner mit Opt-in (`src/components/CookieConsent.jsx`, `src/lib/consent.js`).
  Statistik wird erst nach Zustimmung geladen. Das Tool selbst ist ein Platzhalter in `loadStatistics()`.
- Impressum und Datenschutzerklärung unter `/impressum` und `/datenschutz`.
  Markierte Platzhalter (Hosting, MWST-Nummer, E-Mail-Anbieter) vor dem Livegang ergänzen
  und die Texte juristisch prüfen lassen.
- Kontaktformular verlangt die Datenschutz-Einwilligung im Frontend und im Server.
- Schriften, Bilder und Video werden selbst gehostet. Keine Google Fonts, kein YouTube.
- Semantische Landmarks, Skip-Link, sichtbare Fokus-Ringe, Kontraste ≥ 5.4:1,
  Hintergrundvideo pausierbar und bei `prefers-reduced-motion` angehalten.

## Hero-Video

`public/media/hero.(mp4|webm)` ist aus eigenen Baustellenfotos gerendert
(langsame Kamerafahrten, warm gegradet, Filmkorn) und läuft im Browser mit halber Geschwindigkeit.
Für eine echte Filmaufnahme einfach die beiden Dateien und `hero-poster.jpg` ersetzen.
