import { Background } from "./background";

export function NotFound() {
  return (
    <div>
      <Background imageUrl="/backgrounds/daftpunk/1.png"/>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-70">
        <h1 className="text-4xl font-bold mb-2">
          This is awkward...
        </h1>

        <p className="text-muted-foreground/60 mb-6 max-w-md italic animate-pulse">
          The requested page could not be located.
        </p>
      </main>
    </div>
  )
}
