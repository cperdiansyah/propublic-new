import type React from 'react'
import ReactMarquee, { type MarqueeProps } from 'react-fast-marquee'

interface IMarquee extends MarqueeProps {
  text: string
  color?: 'black' | 'white' | string
  background?: 'black' | 'white' | string
}
const Marquee: React.FC<IMarquee> = ({
  text,
  background = 'white',
  color = 'black',
  direction = 'left',
  ...props
}) => {
  return (
    <ReactMarquee
      {...props}
      style={{
        padding: 0,
        color: color,
        background: background,
        zIndex: 10,
      }}
      speed={25}
      direction={direction}
      className="marquee-wrapper"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((id) => (
        <ul key={id} className="react-marquee">
          {text}
        </ul>
      ))}
    </ReactMarquee>
  )
}

export default Marquee
