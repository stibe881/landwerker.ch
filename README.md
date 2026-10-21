# landwerker.ch

Website der Landwerker GmbH, Menznau. Holzbau und PV-Anlagen.
React 19, Vite, Tailwind CSS 4, GSAP, kleiner Node-Server für das Kontaktformular.
Design-Regeln und Designsystem: `CLAUDE.md`. Visuelle Referenzen: `docs/referenzen.md`.

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

Google Analytics 4: Mess-ID beim Build setzen, sonst wird nichts geladen.

```bash
VITE_GA_ID=G-XXXXXXXXXX npm run build
```

Das Skript wird erst nach Zustimmung im Cookie-Banner geladen. Beim Widerruf werden die `_ga`-Cookies gelöscht.
In der Google-Analytics-Verwaltung die Datenaufbewahrung auf 14 Monate stellen (so steht es in der Datenschutzerklärung).

`npm run build:preview` erzeugt eine statische Vorschau ohne Server (`dist-preview/`).
Das Formular validiert dort, versendet aber nichts.

## Inhalte pflegen

Alle Texte, Kontaktdaten und Referenzen stehen in `src/content.js`.
Neue Referenzbilder als WebP nach `public/media/work/` legen und in `projects` eintragen, mit Alt-Text.

## Recht und Barrierefreiheit

- Cookie-Banner mit Opt-in (`src/components/CookieConsent.jsx`, `src/lib/consent.js`).
  Google Analytics wird erst nach Zustimmung geladen (`src/lib/consent.js`).
- Impressum und Datenschutzerklärung unter `/impressum` und `/datenschutz`.
  Markierter Platzhalter im Impressum (MWST-Nummer) vor dem Livegang ergänzen
  und die Texte juristisch prüfen lassen.
- Kontaktformular verlangt die Datenschutz-Einwilligung im Frontend und im Server.
- Schriften (Google Fonts: Big Shoulders, Newsreader) werden über Fontsource selbst gehostet,
  ebenso alle Bilder. Kein Abruf bei Google, kein YouTube.
- Semantische Landmarks, Skip-Link, sichtbare Fokus-Ringe, Kontraste ≥ 5.4:1,
  Hintergrundvideo pausierbar und bei `prefers-reduced-motion` angehalten.

## Hero-Bild

`public/media/hero-terrasse.webp` (2000 px) und `hero-terrasse-1100.webp` (Mobile), vom Kunden vorgegeben.
Darüber liegt eine gleichmässige Abdunkelung (65 % Tinte), damit weisse Schrift auch über dem hellen Himmel
mindestens 4.6:1 Kontrast hat. Beim Austausch des Bildes diesen Wert neu prüfen.
