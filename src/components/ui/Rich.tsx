import { Fragment } from 'react'

/** Renders the tiny markup used in src/data: **bold** and *italic*. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-fg">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 1) {
      return (
        <em key={index} className="text-accent not-italic">
          {part.slice(1, -1)}
        </em>
      )
    }
    return <Fragment key={index}>{part}</Fragment>
  })
}
