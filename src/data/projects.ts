import dabliuNotesCover from '../assets/img/portfolio/dabliu-notes-cover.svg'
import gtFleet365Cover from '../assets/img/portfolio/gt-fleet-365-cover.svg'
import gtFleetWebCover from '../assets/img/portfolio/gt-fleet-web-cover.svg'
import mySarmaCover from '../assets/img/portfolio/mysarma-welfare-cover.svg'

export type ProjectCategory = 'app' | 'web'

export type ProjectLinkKind = 'google-play' | 'app-store' | 'site' | 'product'

export type Project = {
  id: string
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
  'Una selezione di progetti mobile e web collegati al mio percorso professionale.'

export const projectFilters: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'app', label: 'App' },
  { value: 'web', label: 'Web' },
]

export const projects: Project[] = [
  {
    id: 'dabliu-notes',
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
]
