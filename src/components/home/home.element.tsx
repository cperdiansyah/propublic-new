export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 top-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-black" />

      {/* Grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,0,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,0,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-red-600/8 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Geometric shapes */}
      <div
        className="absolute top-20 right-20 w-32 h-32 border border-red-500/20 rotate-45 animate-spin"
        style={{ animationDuration: '20s' }}
      />
      <div
        className="absolute bottom-32 left-32 w-24 h-24 border border-yellow-500/20 rotate-12 animate-bounce"
        style={{ animationDuration: '3s' }}
      />

      {/* Scanning line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-2 animate-pulse" />
    </div>
  )
}
export function CornerDecorations() {
  return (
    <>
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-red-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-red-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-red-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-red-400/50" />
    </>
  )
}
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Animated hexagon grid */}
      <div className="absolute inset-0 opacity-10">
        <svg
          width="100%"
          height="100%"
          viewBox="100 0 100 100"
          className="scale-100"
        >
          <defs>
            <pattern
              id="hexagons"
              x="0"
              y="0"
              width="10"
              height="8.66"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="5,0 10,2.89 10,7.21 5,10 0,7.21 0,2.89"
                stroke="#dc2626"
                strokeWidth="0.2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect
            width={100}
            height={100}
            className="w-screen h-screen "
            fill="url(#hexagons)"
          />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl floating"></div>
      <div
        className="absolute bottom-10 right-1/4 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl floating"
        style={{ animationDelay: '3s' }}
      ></div>

      {/* Laser scan lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
    </div>
  )
}

export default AnimatedBackground
