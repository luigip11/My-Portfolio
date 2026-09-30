export type EducationItem = {
  title: string
  org: string
  issued?: string
  credentialId?: string
  skills?: string
  description?: string
}

export type ExperienceItem = {
  title: string
  period: string
  org: string
  current?: boolean
  bullets: string[]
}

export const education: EducationItem[] = [
  {
    title: 'Principi di progettazione UX/UI',
    org: 'Coursera',
    issued: 'lug 2024',
    credentialId: '7AE695WMMZHS',
  },
  {
    title: 'Framework Scrum: le basi',
    org: 'LinkedIn',
    issued: 'mag 2024',
    credentialId: '66a405dc6e3b7db005f4b5718ad76332d1aa283c3194279283069535cbbe6f59',
    skills: 'Scrum',
  },
  {
    title: 'Comunicazione interpersonale',
    org: 'LinkedIn',
    issued: 'apr 2024',
    credentialId: 'fb9dbd6ba6f00904b915897f38f79d658c0d167640a7ce5f2b4fd368f2a504c2',
    skills: 'Comunicazione interpersonale',
  },
  {
    title: 'Comunicazione con intelligenza emotiva',
    org: 'LinkedIn',
    issued: 'apr 2024',
    credentialId: 'cde9285f3413ab1d63cf5df5d3d1f87f2b809853f762d9ce3f341843d16c1ddc',
  },
  {
    title: 'Corso per sviluppatore senior in React',
    org: 'Zero To Mastery Academy, Udemy',
    description:
      "Uso della libreria React (JS) insieme a Redux, Hooks, GraphQL, Thunk, Stripe, Firebase, Heroku. Creazione di una web app per l'abbigliamento con sistema di pagamento.",
  },
  {
    title: 'Laurea in Informatica & Comunicazione Digitale',
    org: 'Facoltà di Informatica, Università degli studi di Bari "Aldo Moro", Bari',
    description:
      'Tesi di laurea in Sistemi ad Agenti dal titolo "Pepper e i Serious Games per la terapia logopedica". Creazione di un app Android scritta in Java e XML con quattro Serious Games per la terapia logopedica eseguibile sul robot Pepper.',
  },
  {
    title: 'Diploma di liceo scientifico, indirizzo Tecnologico',
    org: 'Liceo scientifico statale "G. Tarantino", Gravina in Puglia',
  },
]

export const experience: ExperienceItem[] = [
  {
    title: 'Mobile Design Developer',
    period: 'set 2025 - presente',
    org: 'Wacebo Europe, Locorotondo',
    current: true,
    bullets: [
      "Sviluppatore e tester dell'area sviluppo.",
      'Procedure di sviluppo tramite metodologia Agile.',
      'Collaborazione nella definizione del design.',
    ],
  },
  {
    title: 'Mobile App Developer',
    period: 'set 2024 - ago 2025',
    org: 'Omninext, Bari',
    bullets: [
      "Responsabile e sviluppatore area mobile dell'azienda.",
      'Procedure di sviluppo tramite metodologia Agile.',
      'Test e rilasci in ambiente iOS e Android.',
      'Collaborazione nella definizione del design.',
    ],
  },
  {
    title: 'Web & Mobile Developer',
    period: 'mag 2021 - mag 2024',
    org: 'MacNil - GT Alarm, Gravina in Puglia, Bari',
    bullets: [
      'Sviluppatore frontend e backend per applicativi web e mobile nel settore IoT.',
      'Procedure di sviluppo tramite metodologia Agile.',
      'Test e sviluppo di POC in campo IoT.',
    ],
  },
  {
    title: 'Tecnico PC e Consulente Informatico',
    period: '2012 - Presente',
    org: 'LP - Soluzioni Informatiche, Gravina in Puglia, Bari',
    current: true,
    bullets: [
      'Formattazione PC (Desktop, Portatili).',
      'Installazione e/o re-installazione S.O. (Windows OS, MacOS, Linux).',
      'Installazione programmi base o su commissione.',
      'Salvataggio e recupero dati dai dispositivi.',
      'Rimozione virus.',
      'Aggiunta o sostituzione componenti hardware per PC.',
      'Consulenza informatica per privati e piccole attività.',
    ],
  },
  {
    title: 'Assistente grafico e fotografo',
    period: 'lug 2009 - set 2009',
    org: 'Phototour srl, Gravina in Puglia, Bari',
    bullets: [
      'Apprendistato per imparare ad utilizzare Adobe Photoshop e programmi di stampa.',
      'Creazione di album fotografici e copertine Dvd su commissione.',
      'Foto ritocco per foto digitali e foto antiche usurate.',
    ],
  },
]
