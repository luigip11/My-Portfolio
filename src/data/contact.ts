import type { IconType } from 'react-icons'
import { BiLogoFacebook, BiLogoLinkedin } from 'react-icons/bi'
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu'
import { profile } from './profile'

export type ContactItem = {
  title: string
  text: string
  href?: string
  external?: boolean
  icon: IconType
}

export const contactIntro = 'Per info puoi contattarmi tramite email, Facebook o Linkedin.'

export const contacts: ContactItem[] = [
  { title: 'Mi trovi a', text: 'Gravina in Puglia, BA', icon: LuMapPin },
  { title: 'Email', text: profile.email, href: `mailto:${profile.email}`, icon: LuMail },
  {
    title: 'Facebook',
    text: 'La mia pagina',
    href: 'https://www.facebook.com/LPSoluzioniInformatiche/',
    external: true,
    icon: BiLogoFacebook,
  },
  {
    title: 'Linkedin',
    text: 'Il mio profilo',
    href: 'https://www.linkedin.com/in/luigi-puzziferri-11g1993a/',
    external: true,
    icon: BiLogoLinkedin,
  },
  {
    title: 'Cellulare',
    text: 'Il mio numero di cellulare è accessibile solo su richiesta!',
    icon: LuPhone,
  },
]

export const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12077.748978238948!2d16.416160191205815!3d40.81835865803735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13387bf440c0f9c3%3A0xe3bf1996040bacc1!2s70024%20Gravina%20in%20Puglia%20BA!5e0!3m2!1sit!2sit!4v1630313845864!5m2!1sit!2sit'
