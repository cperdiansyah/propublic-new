export default function CornerDecorations() {
  return (
    <>
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-red-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-red-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-red-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-red-400/50" />
    </>
  )
}
