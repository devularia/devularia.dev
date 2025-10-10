interface BackgroundProps {
  imageUrl: string
}

export function Background({ imageUrl }: BackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat saturate-0 brightness-10"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

      <img
        src="/stroke.svg"
        className="absolute bottom-0 left-250 translate-y-[5%] w-300 h-auto opacity-8 pointer-events-none select-none"
      />
    </div>
  )
}
