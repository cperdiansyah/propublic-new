const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Animated hexagon grid */}
      <div className="absolute inset-0 opacity-10">
        <svg
          width="100%"
          height="100%"
          viewBox="100 0 100 100"
          // className="scale-100"
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
            // width={100}
            // height={100}
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
      {/* <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div> */}
    </div>
  )
}

export default AnimatedBackground
