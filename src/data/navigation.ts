import type { IconType } from 'react-icons'
import {
  LuChartBar,
  LuFileText,
  LuHouse,
  LuLayoutGrid,
  LuLightbulb,
  LuMail,
  LuPenLine,
  LuUser,
} from 'react-icons/lu'

export type SectionId =
  | 'hero'
  | 'about'
  | 'facts'
  | 'skills'
  | 'resume'
  | 'portfolio'
  | 'blog'
  | 'contact'

export type NavItem = {
  id: SectionId
  label: string
  icon: IconType
  /** Shown directly in the compact mobile dock; the rest live in the menu sheet. */
  primary?: boolean
}

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: LuHouse, primary: true },
  { id: 'about', label: 'Chi sono', icon: LuUser, primary: true },
  { id: 'facts', label: 'Dati', icon: LuChartBar },
  { id: 'skills', label: 'Skills', icon: LuLightbulb },
  { id: 'resume', label: 'CV', icon: LuFileText },
  { id: 'portfolio', label: 'Portfolio', icon: LuLayoutGrid, primary: true },
  { id: 'blog', label: 'Blog', icon: LuPenLine },
  { id: 'contact', label: 'Contatti', icon: LuMail, primary: true },
]
