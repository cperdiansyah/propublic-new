export default function AcademyBackgroundEffects() {
  return (
    <div className="absolute inset-0">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />

      {/* Radial gradients for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-600/8 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-red-700/6 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Diagonal lines */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(220,38,38,0.02)_50%,transparent_52%)] bg-[size:40px_40px]" />

      {/* Floating geometric shapes */}
      <div className="absolute top-32 left-20 w-16 h-16 border border-red-500/20 rotate-45 animate-spin-slow" />
      <div className="absolute top-1/2 right-32 w-12 h-12 border border-red-400/15 rotate-12 animate-bounce-slow" />
      <div className="absolute bottom-32 left-1/2 w-20 h-20 border border-red-600/10 -rotate-12 animate-pulse" />

      {/* Scanning lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent animate-pulse delay-500" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-red-400/15 to-transparent animate-pulse delay-1500" />

      {/* Particle effects */}
      <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-red-500/40 rounded-full animate-ping" />
      <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-red-400/60 rounded-full animate-ping delay-700" />
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-red-600/30 rounded-full animate-ping delay-1200" />

      {/* Hexagonal patterns */}
      <div className="absolute inset-0 opacity-5">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="animate-pulse"
        >
          <defs>
            <pattern
              id="hexagons-academy"
              x="0"
              y="0"
              width="10"
              height="8.66"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="5,0 10,2.89 10,7.21 5,10 0,7.21 0,2.89"
                stroke="#dc2626"
                strokeWidth="0.1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons-academy)" />
        </svg>
      </div>

      {/* Glowing orbs with movement */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-red-500/20 to-red-700/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-40 left-32 w-24 h-24 bg-gradient-to-l from-red-600/15 to-red-800/5 rounded-full blur-xl animate-float delay-1000" />

      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(220,38,38,0.02)_50%,transparent_100%)]" />

      {/* Edge glow effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
    </div>
  )
}
