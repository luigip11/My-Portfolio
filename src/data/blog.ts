import type { IconType } from 'react-icons'
import { LuCreditCard, LuGamepad2, LuShoppingBag, LuShoppingCart } from 'react-icons/lu'

export const blog = {
  intro: 'Puoi consultare tutte le mie recensioni riguardanti il mondo della tecnologia sul mio blog:',
  name: 'TECHNOLOGY IMMERSION',
  href: 'https://technologyimmersion.altervista.org/',
  offersIntro: 'Di seguito alcune offerte per voi:',
}

export type Offer = {
  title: string
  description: string
  href: string
  icon: IconType
}

/** Affiliate links: rendered with rel="sponsored". */
export const offers: Offer[] = [
  {
    title: 'AMAZON',
    description: 'Scopri le migliori offerte nella categoria Informatica e non solo!',
    href: 'https://www.amazon.it/computer/b/ref=as_li_ss_tl?ie=UTF8&node=425916031&ref_=nav_cs_pc&linkCode=sl2&tag=techrec1-21&linkId=c5983dacea358d0e7225ca622830924c&language=it_IT',
    icon: LuShoppingCart,
  },
  {
    title: 'AMAZON PRIME',
    description: 'Tutti i benefici racchiusi in un unico pacchetto gratis per 30 giorni, scoprilo ora!',
    href: 'https://www.amazon.it/amazonprime/ref=as_li_ss_tl?_encoding=UTF8&ref_=footer_prime&linkCode=sl2&tag=techrec1-21&linkId=876219de9b7c04bdfa95e63267066b79&language=it_IT',
    icon: LuShoppingBag,
  },
  {
    title: 'INSTANT GAMING',
    description:
      'Vuoi comprare gli ultimi videogames per qualsiasi console a prezzi stracciati? Visita Instant Gaming!',
    href: 'https://www.instant-gaming.com/en/?igr=lpgaming',
    icon: LuGamepad2,
  },
  {
    title: 'CARTA HYPE',
    description:
      'Se cerchi una carta prepagata gratis, contactless e dotata di IBAN allora HYPE fa al caso tuo! Al momento dell\'attivazione, ricaricandola di 1 EUR riceverai fino a 25 EUR di bonus!',
    href: 'https://www.hype.it/landing-mgm?proof=372b394f61703532535a6b3d&proofType=hype&promoCode=INV-372b394f61703532535a6b3d&utm_source=mgm&utm_medium=372b394f61703532535a6b3d',
    icon: LuCreditCard,
  },
]
