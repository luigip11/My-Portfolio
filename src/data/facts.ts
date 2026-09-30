import type { IconType } from 'react-icons'
import { LuClock, LuGithub, LuUserCheck, LuWrench } from 'react-icons/lu'

export type Fact = {
  value: number
  highlight: string
  rest: string
  icon: IconType
}

export const factsIntro = 'Di seguito i risultati di analisi su alcune mie statistiche.'

export const facts: Fact[] = [
  { value: 185, highlight: 'Lavori eseguiti', rest: 'fino ad ora', icon: LuWrench },
  { value: 107, highlight: 'Consulenze', rest: 'effettuate', icon: LuUserCheck },
  { value: 743, highlight: 'Ore', rest: 'impiegate per i clienti', icon: LuClock },
  { value: 9, highlight: 'GitHub Repositories', rest: 'creati fino ad ora', icon: LuGithub },
]
