import type { IconType } from 'react-icons'
import {
  BiLogoHtml5,
  BiLogoJava,
  BiLogoJavascript,
  BiLogoReact,
  BiLogoVisualStudio,
  BiLogoWindows,
  BiSolidFileCss,
} from 'react-icons/bi'
import { SiAndroidstudio, SiApple, SiFigma, SiFlutter, SiXcode } from 'react-icons/si'
import { TbBrandAdobePhotoshop, TbBrandOffice } from 'react-icons/tb'

export type Skill = {
  name: string
  level: number
  icon: IconType
}

export type SkillGroup = {
  title: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Sistemi & strumenti',
    skills: [
      { name: 'Windows OS', level: 95, icon: BiLogoWindows },
      { name: 'macOS', level: 85, icon: SiApple },
      { name: 'Microsoft Office', level: 90, icon: TbBrandOffice },
      { name: 'Visual Studio Code', level: 90, icon: BiLogoVisualStudio },
      { name: 'Android Studio', level: 70, icon: SiAndroidstudio },
      { name: 'Xcode', level: 70, icon: SiXcode },
      { name: 'Adobe Photoshop', level: 75, icon: TbBrandAdobePhotoshop },
      { name: 'Figma', level: 75, icon: SiFigma },
    ],
  },
  {
    title: 'Linguaggi & framework',
    skills: [
      { name: 'HTML', level: 90, icon: BiLogoHtml5 },
      { name: 'Javascript', level: 85, icon: BiLogoJavascript },
      { name: 'React', level: 75, icon: BiLogoReact },
      { name: 'Flutter (Dart)', level: 90, icon: SiFlutter },
      { name: 'Java', level: 60, icon: BiLogoJava },
      { name: 'CSS', level: 80, icon: BiSolidFileCss },
    ],
  },
]
