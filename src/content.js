// Zentrale Inhalte. Texte, Kontaktdaten und Referenzen an einem Ort pflegen.

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
  founded: 2018,
  team: 4,
}

export const nav = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'team', label: 'Über uns' },
  { id: 'arbeiten', label: 'Arbeiten' },
  { id: 'kontakt', label: 'Kontakt' },
]

const img = (name) => `${import.meta.env.BASE_URL}media/work/${name}.webp`

export const expertise = [
  {
    id: 'holzbau',
    index: '01',
    title: 'Meisterhafter Holzbau',
    lead: 'Holz ist unser Werkstoff. Seit der Lehre in einer Dorfzimmerei.',
    body: [
      'Wir bauen Terrassen, Carports und Pergolen. Wir sanieren Fassaden und Dächer und bauen Dachgeschosse aus.',
      'Wo es Sinn macht, verwenden wir Schweizer Holz und Baustoffe. Wir sind offizieller Montagepartner von Millboard, Velux und Rollfix.',
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
    image: img('balkenlage-uffikon'),
    // ALT-TEXT: bei Bedarf präzisieren
    alt: 'Neue Balkenlage aus hellem Konstruktionsholz auf einem Hausdach in Uffikon. Ein Zimmermann steht auf den Balken.',
  },
  {
    id: 'pv',
    index: '02',
    title: 'Schlüsselfertige PV-Anlagen',
    lead: 'Vom Dach bis in den Keller. Aus einer Hand.',
    body: [
      'Wir prüfen das Dach, montieren die Module und installieren Generatoranschlusskasten, Wechselrichter und Speicher. Die Kabel führen wir bis ins Untergeschoss.',
      'Muss das Dach vorher saniert werden, erledigen wir das im selben Zug. Auch in Dorfkernzonen.',
    ],
    services: [
      'Besichtigung und Dachprüfung',
      'Energetische Dachsanierung',
      'Modulmontage auf Ziegel- und Eternitdächern',
      'Wechselrichter und Batteriespeicher',
      'Kabelführung bis ins Untergeschoss',
      'Übergabe der fertigen Anlage',
    ],
    image: img('pv-uffikon'),
    alt: 'Schwarze Photovoltaik-Module auf einem Satteldach in der Dorfkernzone von Uffikon, im Hintergrund ein Kirchturm.',
  },
]

export const facts = [
  { value: '2018', label: 'gegründet in Menznau' },
  { value: '4', label: 'Leute im Team' },
  { value: '2', label: 'Sparten: Holzbau und PV' },
]

export const credo = {
  quote: 'Ist der Kunde zufrieden, sind wir es auch.',
  story: [
    'Ich bin im Zürcher Weinland aufgewachsen und habe meine Lehre in einer kleinen Dorfzimmerei gemacht. Seit 2000 lebe ich in der Zentralschweiz, seit 2014 mit meiner Familie in Menznau.',
    'Ende 2018 habe ich mir einen lang gehegten Wunsch erfüllt und die Landwerker GmbH gegründet. Heute sind wir zu viert. Mit den PV-Anlagen ist ein zweites Standbein dazugekommen.',
    'Wir arbeiten sauber, halten Termine und sagen, was geht und was nicht. Zusammen mit Partnern, auf die wir uns verlassen. Und mit Ihnen.',
  ],
  signature: 'Stefan Möckli, Gründer',
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

// Referenzen. Bild, Kategorie, Titel, Ort, Jahr und Alt-Text pro Eintrag.
export const projects = [
  {
    category: 'terrassen',
    title: 'Terrasse aus Lärche, natur, gehobelt',
    place: 'Winterthur',
    year: 2026,
    image: img('terrasse-laerche-winterthur'),
    alt: 'Neuer Terrassenboden aus unbehandelter, gehobelter Lärche vor einer Glasfront, gesäumt von Rhododendren.',
    feature: true,
  },
  {
    category: 'sanierungen',
    title: 'Dachsanierung mit Eternit, PV 27 kWp, Speicher 21 kWh',
    place: 'Breitenbach',
    year: 2025,
    image: img('dachsanierung-pv-breitenbach'),
    alt: 'Saniertes Dach mit dunklen Eternitplatten und vollflächig verlegten schwarzen Solarmodulen über einem Dorf.',
  },
  {
    category: 'terrassen',
    title: 'Terrasse mit Sitzbank, Millboard Coppered Oak',
    place: 'Stäfa',
    year: 2025,
    image: img('terrasse-millboard-staefa'),
    alt: 'Terrassenboden aus Millboard-Dielen mit eingebauter Sitzbank vor grauen Pflanzkübeln.',
  },
  {
    category: 'pv',
    title: 'PV-Anlage 23.5 kWp in der Dorfkernzone',
    place: 'Uffikon',
    year: 2024,
    image: img('pv-uffikon'),
    alt: 'Schwarze Solarmodule auf einem Ziegeldach, dahinter der Kirchturm von Uffikon unter blauem Himmel.',
  },
  {
    category: 'sanierungen',
    title: 'Fassadensanierung mit Stulpschalung',
    place: 'Steinhauserberg',
    year: 2025,
    image: img('fassade-steinhauserberg'),
    alt: 'Bauernhaus mit neuer, heller Holzfassade in Stulpschalung vor einer grünen Wiese.',
  },
  {
    category: 'terrassen',
    title: 'Terrasse mit Millboard Golden Oak',
    place: 'Kleinandelfingen',
    year: 2025,
    image: img('terrasse-millboard-kleinandelfingen'),
    alt: 'Grosszügige Terrasse aus Millboard-Dielen rund um eine Platane mit Blick über die Landschaft.',
  },
  {
    category: 'sanierungen',
    title: 'Dachsanierung mit Gutex-Holzfaserdämmung',
    place: 'Mellingen',
    year: 2024,
    image: img('dachsanierung-mellingen'),
    alt: 'Dachfläche mit verlegten Holzfaser-Dämmplatten als Unterdach, umgeben von einem Gerüst.',
  },
  {
    category: 'holzbau',
    title: 'Innenausbau Dachgeschoss',
    place: 'Uffikon',
    year: 2024,
    image: img('innenausbau-uffikon'),
    alt: 'Ausgebautes Dachgeschoss mit heller Holzdecke aus Dreischichtplatten und weissen Wänden.',
  },
  {
    category: 'pv',
    title: 'PV-Anlage, Süd- und Nordseite voll belegt',
    place: 'Menznau',
    year: 2026,
    image: img('pv-menznau'),
    alt: 'Einfamilienhaus mit Ziegeldach und Solarmodulen in hügeliger Landschaft, Sonnenlicht von rechts.',
  },
  {
    category: 'terrassen',
    title: 'Dachterrasse mit Millboard',
    place: 'Jona',
    year: 2024,
    image: img('dachterrasse-jona'),
    alt: 'Dachterrasse mit hellen Dielen und Glasgeländer über einer Wohnsiedlung.',
  },
  {
    category: 'sanierungen',
    title: 'Fassadensanierung mit James-Hardie-Paneelen',
    place: 'Breitenbach',
    year: 2025,
    image: img('fassade-breitenbach'),
    alt: 'Einfamilienhaus mit neu verkleidetem Obergeschoss aus dunkelgrauen Fassadenpaneelen.',
  },
  {
    category: 'holzbau',
    title: 'Pergola mit Überdachung und Unterdach-Markise',
    place: null,
    year: null,
    image: img('pergola'),
    alt: 'Weisse Holzpergola mit transparenter Überdachung vor einem roten Gartenhaus.',
  },
  {
    category: 'terrassen',
    title: 'Terrasse aus Douglasie',
    place: 'Höhlstein',
    year: 2022,
    image: img('terrasse-douglasie-hoehlstein'),
    alt: 'Frisch verlegter, rötlicher Terrassenboden aus Douglasie auf einer Wiese am Waldrand.',
  },
]
