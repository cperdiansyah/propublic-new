interface GradientBackgroundProps {
  top?: number
  bottom?: number
  right?: number
  left?: number
  width?: number
  mirror?: boolean
}
function GradientBackground({
  top,
  bottom,
  right,
  left,
  width,
  mirror = false,
}: GradientBackgroundProps) {
  return (
    <img
      alt="Gradient background element"
      src={'/svg/red-gradient.svg'}
      width={width || 300}
      style={{
        position: 'absolute',
        top: top,
        bottom: bottom,
        right: right,
        left: left,
        transform: mirror ? 'scale(-1, -1)' : 'scale(1, 1)',
        zIndex: 0,
      }}
    />
  )
}

export default GradientBackground
