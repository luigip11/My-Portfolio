import dabliuNotesCover from '../assets/img/portfolio/dabliu-notes-cover.svg'
import furnitureConfiguratorCover from '../assets/img/portfolio/furniture-configurator-cover.svg'
import gamePanelCover from '../assets/img/portfolio/gamepanel-cover.svg'
import gtFleet365Cover from '../assets/img/portfolio/gt-fleet-365-cover.svg'
import gtFleetWebCover from '../assets/img/portfolio/gt-fleet-web-cover.svg'
import mySarmaCover from '../assets/img/portfolio/mysarma-welfare-cover.svg'

export type ProjectCategory = 'app' | 'web'

export type ProjectGroup = 'work' | 'personal'

export type ProjectLinkKind = 'google-play' | 'app-store' | 'site' | 'product' | 'github'

export type Project = {
  id: string
  group: ProjectGroup
  title: string
  kind: string
  category: ProjectCategory
  cover: string
  coverAlt: string
  description: string
  tags: string[]
  links: { kind: ProjectLinkKind; label: string; href: string }[]
}

export const portfolioIntro =
  'Una selezione di progetti mobile, web e desktop: quelli realizzati nel mio percorso professionale e quelli personali che sviluppo in autonomia.'

export const projectFilters: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'app', label: 'App' },
  { value: 'web', label: 'Web' },
]

export const projectGroups: { value: ProjectGroup; title: string; description: string }[] = [
  {
    value: 'work',
    title: 'Progetti lavorativi',
    description: 'App e piattaforme realizzate per aziende e clienti.',
  },
  {
    value: 'personal',
    title: 'Progetti personali',
    description: "Idee in cui credo, che porto avanti in autonomia dall'interfaccia al codice.",
  },
]

export const projects: Project[] = [
  {
    id: 'dabliu-notes',
    group: 'work',
    title: 'Dabliu Notes',
    kind: 'App mobile',
    category: 'app',
    cover: dabliuNotesCover,
    coverAlt: 'Cover progetto Dabliu Notes',
    description:
      'Ecosistema digitale per appunti, collaborazione in tempo reale e strumenti AI dedicati a studio, didattica e produttività.',
    tags: ['Notes', 'Collaboration', 'AI Tools'],
    links: [
      {
        kind: 'google-play',
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.waceboeurope.dabliunotes&hl=it',
      },
      {
        kind: 'app-store',
        label: 'App Store',
        href: 'https://apps.apple.com/it/app/dabliu-notes/id6498628033',
      },
    ],
  },
  {
    id: 'mysarma-welfare',
    group: 'work',
    title: 'MySarma Welfare',
    kind: 'App mobile',
    category: 'app',
    cover: mySarmaCover,
    coverAlt: 'Cover progetto MySarma Welfare',
    description:
      'App dedicata al welfare aziendale, pensata per usare credito welfare, richiedere rimborsi e accedere a un catalogo di servizi e voucher.',
    tags: ['Welfare', 'Voucher', 'Finance'],
    links: [
      {
        kind: 'google-play',
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=it.omninext.mysarma&hl=it',
      },
    ],
  },
  {
    id: 'gt-fleet-365',
    group: 'work',
    title: 'GT Fleet 365',
    kind: 'App mobile',
    category: 'app',
    cover: gtFleet365Cover,
    coverAlt: 'Cover progetto GT Fleet 365',
    description:
      'Soluzione mobile per fleet management con localizzazione, monitoraggio mezzi, sicurezza, manutenzioni e analisi operative della flotta.',
    tags: ['Fleet Management', 'Tracking', 'Security'],
    links: [
      {
        kind: 'google-play',
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=it.macnil.gtfleet365&hl=it',
      },
      {
        kind: 'app-store',
        label: 'App Store',
        href: 'https://apps.apple.com/it/app/gt-fleet-365/id6451249812',
      },
    ],
  },
  {
    id: 'gt-fleet-365-web',
    group: 'work',
    title: 'GT Fleet 365 Web',
    kind: 'Piattaforma web',
    category: 'web',
    cover: gtFleetWebCover,
    coverAlt: 'Cover progetto GT Fleet Web Platform',
    description:
      'Interfaccia web orientata al controllo flotta, con focus su dashboard operative, analisi mezzi e accesso ai servizi di gestione e monitoraggio.',
    tags: ['Web App', 'Dashboard', 'Fleet', 'Operations'],
    links: [
      { kind: 'site', label: 'Apri sito', href: 'https://macnil.gtfleet.net/' },
      { kind: 'product', label: 'Scheda prodotto', href: 'https://macnil.it/brand/gt-fleet-365/' },
    ],
  },
  {
    id: 'furniture-configurator',
    group: 'personal',
    title: 'Furniture Configurator',
    kind: 'Web app 3D',
    category: 'web',
    cover: furnitureConfiguratorCover,
    coverAlt: 'Cover progetto Furniture Configurator',
    description:
      'MVP di un configuratore 3D per arredi modulari: composizione nella scena, misure e ante personalizzabili, riepilogo prezzi e richiesta di preventivo, con pannello admin per il catalogo.',
    tags: ['3D', 'Next.js', 'Three.js', 'Supabase'],
    links: [
      { kind: 'site', label: 'Apri demo', href: 'https://furniture-configurator-ten.vercel.app/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/luigip11/furniture-configurator-mvp' },
    ],
  },
  {
    id: 'gamepanel',
    group: 'personal',
    title: 'GamePanel',
    kind: 'App desktop',
    category: 'app',
    cover: gamePanelCover,
    coverAlt: 'Cover progetto GamePanel',
    description:
      'App Windows che riunisce libreria giochi e configurazioni grafiche: DLSS per le copie RTX Remix, strumenti HDR e ReShade, profili di risoluzione e pacchetti grafici con backup e ripristino. In fase alpha.',
    tags: ['Windows', 'WPF', 'DLSS', 'ReShade'],
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/luigip11/GamePanel' }],
  },
]
