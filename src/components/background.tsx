interface BackgroundProps {
  imageUrl: string
}

export function Background({ imageUrl }: BackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat saturate-0 opacity-20"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
