# Landwerker GmbH – Website

React 19 + Vite + Tailwind CSS 4, GSAP für Bewegung, Node-Server (`server/index.js`) für das Kontaktformular.
Inhalte: `src/content.js`. Fotos: `public/media/work/` (nur eigene Baustellenfotos).

## Design-Regeln (bei jedem Prompt beachten)

Vor jeder Gestaltungsarbeit den Skill `frontend-design` laden (`.claude/skills/frontend-design`).

- Vermeide typische AI-Design-Patterns: keine zentrierten Hero-Section-Cards mit drei Icons nebeneinander,
  keine violetten/blauen Glow-Gradienten. Nutze asymmetrische Layouts, klaren Editorial-Style oder rohes
  minimalistisches Webdesign.
- Keine generischen Bootstrap- oder Tailwind-Standard-Widgets (Karten mit `rounded-xl shadow-lg`,
  Feature-Grids mit Icons, Badge-Pillen, Testimonial-Slider).
- Keine Verläufe als Dekoration. Farbe nur als ganze Fläche.
- Keine Stock- oder KI-Bilder. Nur eigene Fotos von Landwerker-Baustellen.
  Ausnahme: das Hero-Bild `public/media/hero-terrasse.webp`, vom Kunden vorgegeben.
- Keine Versal-Labels («Eyebrows») über Überschriften, keine Meta-Zeilen mit Mittelpunkt (A · B · C),
  kein «→» in Buttons und Links, keine 01/02/03-Nummerierung ohne echte Reihenfolge.
- Nicht ein einzelnes Wort in einer Headline kursiv oder farbig hervorheben.
- Bewegung (Kunde wünscht eine dynamische Seite): eine orchestrierte Szene beim Laden (Hero), danach nur
  scroll-gekoppelte Bewegung mit Bezug zum Handwerk, zentral in `src/lib/motion.js` über data-Attribute:
  Parallaxe, «Hobel»-Freilegung von Bildern, einfahrende Überschriften und Bilder, Wort-für-Wort-Zitat, Ortsband.
  Fotos immer über `src/components/Foto.jsx` (weiches Einblenden nach dem Laden, nie hartes Aufploppen).
  Keine Endlosschleifen ohne Pause-Knopf, kein generisches Fade-up auf jeder Sektion.
  Alles nur bei `prefers-reduced-motion: no-preference`; ohne JS ist jeder Inhalt sichtbar.
- Alles linksbündig. Zentrierter Text nur, wenn es einen Grund gibt.

## Designsystem

Farben aus dem Kundendesign (Logo-Rot und Farben der bisherigen landwerker.ch). Text immer ≥ 4.5:1:

| Token | Hex | Rolle |
|---|---|---|
| `papier` | `#FCFBF7` | Grundfläche, Kopfzeile (Logo steht auf seinem eigenen Grund) |
| `creme` | `#F6F2E4` | zweite helle Fläche (Über uns, Fusszeile mit Logo, Hover in der Werkliste) |
| `tinte` | `#322B11` | Schrift auf hellem Grund; dunkle Fläche (Ortsband, Hero-Abdunkelung 65 %). Nie mit dem Logo kombinieren (1.9:1) |
| `grau` | `#6B6243` | Nebentext auf Papier und Creme |
| `rot` | `#900000` | Markenrot aus dem Logo: ganze Flächen (PV, Kontakt, Buttons) mit weisser Schrift, Fokusring |
| `rosa` | `#F2D3CF` | Nebentext auf Rot |
| `nebel` | `#CFC6A8` | Nebentext auf Tinte |
| `ocker` | `#B0973B` | nur auf Tinte (4.9:1), nie auf hellem Grund |
| `weiss` | `#FFFFFF` | Schrift auf Rot, Tinte und über dem Hero-Bild |

Schriften (Google Fonts, selbst gehostet über Fontsource, kein Abruf bei Google):

- `Big Shoulders Stencil Display` – nur Hero-Headline. Erinnert an den Sortierstempel auf Bauholz. Einmal pro Seite.
- `Big Shoulders Display` – Überschriften, schmal, Gewicht 500–700, Versalien nur in Überschriften.
- `Newsreader` – Fliesstext und Zitate, 18–20 px, Zeilenhöhe 1.6, max. 65 Zeichen.

Raster: 12 Spalten, Inhalt bewusst versetzt (z. B. Spalten 1–7 und 9–12). Bilder dürfen an den Rand laufen.
Radien: 0. Schatten: keine.

## Recht und Barrierefreiheit (nicht verhandelbar)

- revDSG/DSGVO: Cookie-Banner mit Opt-in, Ablehnen gleichwertig zum Zustimmen. Statistik erst nach Einwilligung.
- Kontaktformular: Pflicht-Checkbox Datenschutz, im Frontend und im Server geprüft.
- Impressum mit UID CHE-343.855.359 und HR-Nr. CH-100.4.806.817-8. Datenschutzerklärung unter `/datenschutz`.
- WCAG 2.1 AA: Landmarks, Skip-Link, sichtbarer Fokus (`focus-visible:ring-2`), Alt-Text bei jedem Bild,
  bewegte Medien pausierbar, Formularfehler mit `aria-describedby`.

## Arbeitsweise

1. Referenzen ansehen (`docs/referenzen.md`), 2. Plan gegen diese Regeln prüfen,
3. bauen, 4. mit Playwright Screenshots machen und selbst kritisieren, dann erst committen.

```bash
npm run dev            # Frontend
node server/index.js   # API :8787
npm run build:preview  # statische Vorschau (dist-preview/)
```
