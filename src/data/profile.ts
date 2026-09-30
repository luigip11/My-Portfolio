const cvFile = 'luigi_puzziferri_cv2025_09.pdf'

export const profile = {
  firstName: 'Luigi',
  lastName: 'Puzziferri',
  initials: 'LP',
  eyebrow: 'Portfolio 2k26',
  lead: 'Progetto esperienze digitali moderne con focus su app mobile, frontend curato e interfacce pensate per essere chiare, utili e veloci.',
  roles: ['Mobile Developer', 'Web Developer', 'UX/UI Designer', 'Consulente informatico'],
  email: 'luigi.p11@outlook.it',
  city: 'Gravina in Puglia (BA)',
  github: 'https://github.com/luigip11/',
  cv: {
    href: `${import.meta.env.BASE_URL}docs/${cvFile}`,
    downloadName: 'Luigi_Puzziferri_CV_2025_09.pdf',
    label: 'Scarica il mio CV',
  },
}

/**
 * Rich text uses a tiny markup rendered by <Rich />:
 * **bold** and *italic*.
 */
export const about = {
  intro: [
    'Mi presento: sono Luigi, laureato in **Informatica e Comunicazione Digitale** presso l\'Università degli Studi di Bari "Aldo Moro".',
    'Sono un **Web e Mobile App Developer**. All\'occorrenza anche consulente informatico e offro assistenza tecnica per i pc.',
    'Appassionato di tecnologia e computer, smanettavo con i primi pc dall\'età di 11 anni fino ad oggi, al passo con i tempi sia nei metodi che nelle conoscenze.',
    'Mi impegno ad offrire sempre *qualità* e *professionalità* nel lavoro e nei vari contesti in cui mi trovo.',
  ],
  facts: [
    {
      key: 'work',
      label: 'Lavoro',
      value: 'Mobile Design Developer presso',
      link: { label: 'Wacebo Europe', href: 'https://www.waceboeurope.com/' },
    },
    { key: 'degree', label: 'Laurea', value: 'Informatica e Comunicazione Digitale' },
    { key: 'email', label: 'E-mail', value: profile.email, href: `mailto:${profile.email}` },
    { key: 'city', label: 'Città', value: profile.city },
    {
      key: 'passions',
      label: 'Passioni',
      value: 'Tecnologia, Videogiochi, Musica, Fotografia, Esplorare il mondo',
    },
  ],
  closing: 'Cerco di migliorarmi giorno per giorno, imparando dal lavoro e dalla gente che mi circonda.',
  motto: 'Pensa sempre in positivo!',
} as const

export type AboutFactKey = (typeof about.facts)[number]['key']
