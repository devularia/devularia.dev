import { Background } from "./background";

export function NotFound() {
  return (
    <div>
      <Background imageUrl="/backgrounds/animals/cat.png" />

      <main className="flex-1 py-70 flex flex-col items-center justify-center text-center px-6 sm:px-12">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">
          This is awkward...
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground/70 mb-6 max-w-md italic animate-pulse">
          The requested page could not be located.
        </p>
      </main>
    </div>
  );
}
