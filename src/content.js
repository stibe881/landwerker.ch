// Alle Inhalte der Website. Texte, Kontaktdaten und Werkliste hier pflegen.

export const company = {
  name: 'Landwerker GmbH',
  owner: 'Stefan Möckli',
  street: 'Allmendweg 4',
  zip: '6122',
  city: 'Menznau',
  canton: 'Luzern',
  phoneOffice: '041 493 20 20',
  phoneOfficeHref: '+41414932020',
  phoneMobile: '079 409 49 80',
  phoneMobileHref: '+41794094980',
  email: 'stefanmoeckli@landwerker.ch',
  uid: 'CHE-343.855.359',
  hr: 'CH-100.4.806.817-8',
}

export const nav = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'werkstatt', label: 'Über uns' },
  { id: 'werkliste', label: 'Werkliste' },
  { id: 'kontakt', label: 'Kontakt' },
]

export const img = (name) => `${import.meta.env.BASE_URL}media/work/${name}.webp`

export const holzbau = {
  title: 'Meisterhafter Holzbau',
  text: [
    'Holz ist unser Werkstoff, seit der Lehre in einer Dorfzimmerei. Wir bauen Terrassen, Carports und Pergolen, sanieren Fassaden und Dächer und bauen Dachgeschosse aus.',
    'Wo es Sinn macht, nehmen wir Schweizer Holz. Wir sind offizieller Montagepartner von Millboard, Velux und Rollfix.',
  ],
  services: [
    'Terrassen und Dachterrassen',
    'Umbauten und Innenausbau',
    'Fassaden- und Dachsanierungen',
    'Carports und Pergolen',
    'Fenster und Dachfenster',
    'Parkett, Laminat, Vinyl',
    'Hochbeete und Tomatenhäuser',
    'Montage, Demontage, Abbruch',
  ],
  image: img('innenausbau-uffikon-2'),
  alt: 'Dachgeschoss in Uffikon im Rohbau: Holzfaserdämmung zwischen den Sparren, darüber die transparente Dampfbremse.',
}

export const pv = {
  title: 'Schlüsselfertige PV-Anlagen',
  text: [
    'Wir prüfen das Dach, montieren die Module und installieren Generatoranschlusskasten, Wechselrichter und Speicher. Die Kabel führen wir bis ins Untergeschoss.',
    'Muss das Dach vorher saniert werden, machen wir das im selben Zug. Auch in der Dorfkernzone.',
  ],
  services: [
    'Besichtigung und Dachprüfung',
    'Energetische Dachsanierung',
    'Module auf Ziegel- und Eternitdach',
    'Wechselrichter und Batteriespeicher',
    'Kabelführung bis ins Untergeschoss',
    'Übergabe der fertigen Anlage',
  ],
  image: img('pv-installation-menznau-keller'),
  alt: 'Technikraum im Untergeschoss in Menznau: zwei Wechselrichter, Generatoranschlusskasten und ein weisser Batteriespeicher an der Wand.',
}

export const werkstatt = {
  quote: 'Ist der Kunde zufrieden, sind wir es auch.',
  story: [
    'Ich bin im Zürcher Weinland aufgewachsen und habe meine Lehre in einer kleinen Dorfzimmerei gemacht. Seit 2000 lebe ich in der Zentralschweiz, seit 2014 mit meiner Familie in Menznau.',
    'Ende 2018 habe ich die Landwerker GmbH gegründet. Heute sind wir zu viert. Mit den PV-Anlagen ist ein zweites Standbein dazugekommen.',
    'Wir arbeiten sauber, halten Termine und sagen, was geht und was nicht. Zusammen mit Partnern, auf die wir uns verlassen. Und mit Ihnen.',
  ],
  signature: 'Stefan Möckli, Gründer',
  card: [
    ['Gegründet', 'Ende 2018'],
    ['Sitz', 'Menznau LU'],
    ['Team', '4 Mitarbeitende, 250 Stellenprozent'],
    ['Partner', 'Millboard, Velux, Rollfix'],
  ],
  image: img('fahrzeug'),
  alt: 'Weisser Lieferwagen der Landwerker GmbH mit Firmenbeschriftung auf einem Feldweg vor einem Waldrand.',
}

export const categories = [
  { id: 'alle', label: 'Alle' },
  { id: 'terrassen', label: 'Terrassen' },
  { id: 'sanierungen', label: 'Sanierungen' },
  { id: 'pv', label: 'PV-Anlagen' },
  { id: 'holzbau', label: 'Holzbau' },
]

// Werkliste: alle Referenzen von landwerker.ch. Jede Zeile mit Foto und Alt-Text.
export const projects = [
  { cat: 'terrassen', work: 'Terrassenboden, gehobelt', material: 'Lärche natur', place: 'Winterthur', year: 2026, image: 'terrasse-laerche-winterthur', alt: 'Neuer Terrassenboden aus unbehandelter, gehobelter Lärche vor einer Glasfront, gesäumt von Rhododendren.' },
  { cat: 'pv', work: 'PV-Installation mit GAK, Wechselrichter, Speicher', material: 'Kabelführung ins Untergeschoss', place: 'Menznau', year: 2026, image: 'pv-installation-menznau-keller', alt: 'Zwei Wechselrichter und ein Batteriespeicher an einer Kellerwand, sauber verlegte Kabelkanäle.' },
  { cat: 'pv', work: 'PV-Anlage, Süd- und Nordseite voll belegt', material: 'Ziegeldach', place: 'Menznau', year: 2026, image: 'pv-installation-menznau-2', alt: 'Einfamilienhaus mit voll belegtem Ziegeldach und Solarmodulen an einem grünen Hang.' },
  { cat: 'holzbau', work: 'Baumbank', material: 'Holz, rund um den Stamm', place: 'Buttisholz', year: 2026, image: 'baumbank-buttisholz', alt: 'Runde Holzbank um einen jungen Baumstamm auf einer Wiese.' },
  { cat: 'sanierungen', work: 'Neue Geländerabdeckung', material: 'Douglasie, gestrichen', place: 'Burgdorf', year: 2026, image: 'gelaender-burgdorf', alt: 'Holzhaus mit neu abgedecktem Treppen- und Balkongeländer in rotbraun gestrichener Douglasie.' },
  { cat: 'sanierungen', work: 'Energetische Dachsanierung mit PV-Anlage', material: 'Eternit, PV 27 kWp, Speicher 21 kWh', place: 'Breitenbach', year: 2025, image: 'dachsanierung-pv-breitenbach', alt: 'Saniertes Dach mit dunklen Eternitplatten und vollflächig verlegten schwarzen Solarmodulen über einem Dorf.' },
  { cat: 'terrassen', work: 'Terrassenboden mit Sitzbank', material: 'Millboard Coppered Oak', place: 'Stäfa', year: 2025, image: 'terrasse-millboard-staefa', alt: 'Terrassenboden aus Millboard-Dielen mit eingebauter Sitzbank vor grauen Pflanzkübeln.' },
  { cat: 'terrassen', work: 'Terrassenboden', material: 'Millboard Golden Oak', place: 'Kleinandelfingen', year: 2025, image: 'terrasse-millboard-kleinandelfingen', alt: 'Grosszügige Terrasse aus Millboard-Dielen rund um eine Platane.' },
  { cat: 'sanierungen', work: 'Energetische Fassadensanierung', material: 'Stulpschalung', place: 'Steinhauserberg', year: 2025, image: 'fassade-steinhauserberg', alt: 'Bauernhaus mit neuer, heller Holzfassade in Stulpschalung vor einer grünen Wiese.' },
  { cat: 'sanierungen', work: 'Energetische Fassadensanierung', material: 'James-Hardie-Fassadenpaneele', place: 'Breitenbach', year: 2025, image: 'fassade-breitenbach', alt: 'Einfamilienhaus mit neu verkleidetem Obergeschoss aus dunkelgrauen Fassadenpaneelen.' },
  { cat: 'holzbau', work: 'Hochbeet', material: 'Lärche natur', place: 'Menznau', year: 2025, image: 'hochbeet-menznau', alt: 'Grosses, mit Erde gefülltes Hochbeet aus Lärchenbrettern in einem Garten.' },
  { cat: 'pv', work: 'PV-Anlage in der Dorfkernzone', material: '23.5 kWp', place: 'Uffikon', year: 2024, image: 'pv-uffikon', alt: 'Schwarze Solarmodule auf einem Ziegeldach, dahinter der Kirchturm von Uffikon.' },
  { cat: 'terrassen', work: 'Dachterrasse', material: 'Millboard', place: 'Jona', year: 2024, image: 'dachterrasse-jona', alt: 'Dachterrasse mit hellen Dielen und Glasgeländer über einer Wohnsiedlung.' },
  { cat: 'sanierungen', work: 'Energetische Dachsanierung', material: 'Gutex-Holzfaserdämmung als Unterdach', place: 'Mellingen', year: 2024, image: 'dachsanierung-mellingen', alt: 'Dachfläche mit verlegten Holzfaser-Dämmplatten als Unterdach, umgeben von einem Gerüst.' },
  { cat: 'sanierungen', work: 'Energetische Dachsanierung, danach PV-Montage', material: 'Ziegeldach', place: 'Erlinsbach', year: 2024, image: 'dachsanierung-pv-erlinsbach', alt: 'Offenes Dach während der Sanierung: neue Lattung über alter Dämmung, Blick ins Tal.' },
  { cat: 'holzbau', work: 'Neue Balkenlage bei Teilumbau', material: 'Konstruktionsholz', place: 'Uffikon', year: 2024, image: 'balkenlage-uffikon', alt: 'Neue Balkenlage aus hellem Konstruktionsholz auf einem Hausdach, ein Zimmermann steht darauf.' },
  { cat: 'holzbau', work: 'Innenausbau Dachgeschoss', material: 'Dämmung und Dampfbremse', place: 'Uffikon', year: 2024, image: 'innenausbau-uffikon-2', alt: 'Dachschräge im Rohbau mit Holzfaserdämmung zwischen den Sparren und transparenter Dampfbremse.' },
  { cat: 'holzbau', work: 'Innenausbau Dachgeschoss', material: 'Holzdecke', place: 'Uffikon', year: 2024, image: 'innenausbau-uffikon', alt: 'Ausgebautes Dachgeschoss mit heller Holzdecke und weissen Wänden.' },
  { cat: 'holzbau', work: 'Abbrucharbeiten für Teilneubau', material: 'Rückbau Dachstuhl', place: 'Uffikon', year: 2024, image: 'abbruch-uffikon', alt: 'Teilweise abgebrochenes Haus mit offenem Dachstuhl, daneben ein Kran.' },
  { cat: 'holzbau', work: 'Sitzbank', material: 'Douglasie', place: 'Frick', year: 2023, image: 'sitzbank-frick', alt: 'Schlichte Sitzbank aus Douglasienlatten an einer Betonmauer über einer Wiese.' },
  { cat: 'terrassen', work: 'Sitzbank auf Terrasse', material: 'Millboard', place: 'Buttisholz', year: 2023, image: 'sitzbank-millboard-buttisholz', alt: 'Quadratische Sitzbank aus Millboard um einen Baum auf einer Plattenterrasse mit Glasgeländer.' },
  { cat: 'terrassen', work: 'Terrassenboden', material: 'Millboard Golden Oak', place: 'Uitikon', year: 2022, image: 'terrasse-millboard-uitikon', alt: 'Lange Terrasse mit Millboard-Dielen in Golden Oak entlang einer Hausfassade.' },
  { cat: 'terrassen', work: 'Terrassenboden', material: 'Douglasie', place: 'Höhlstein', year: 2022, image: 'terrasse-douglasie-hoehlstein', alt: 'Frisch verlegter, rötlicher Terrassenboden aus Douglasie auf einer Wiese.' },
  { cat: 'holzbau', work: 'Zweier-Carport', material: 'Holzkonstruktion', place: 'Ehrendingen', year: 2022, image: 'carport-ehrendingen', alt: 'Offener Holzcarport für zwei Autos auf einem Kiesplatz neben einem Wohnhaus.' },
  { cat: 'holzbau', work: 'Vinylboden in Dachzimmer', material: 'Vinyl, Holzoptik', place: 'Menznau', year: 2022, image: 'vinylboden-menznau', alt: 'Dachzimmer mit neuem Vinylboden in Holzoptik und sichtbarem Holzbalken.' },
  { cat: 'holzbau', work: 'Sichtschutzwand an Hanglage', material: 'Douglasie', place: 'Seengen', year: 2022, image: 'sichtschutz-seengen', alt: 'Gestufte Sichtschutzwand aus horizontalen Holzlatten an einem Hang mit Weitblick.' },
  { cat: 'holzbau', work: 'Pergola mit Überdachung und Unterdach-Markise', material: 'Holz, weiss gestrichen', place: null, year: null, image: 'pergola', alt: 'Weisse Holzpergola mit transparenter Überdachung vor einem roten Gartenhaus.' },
]
