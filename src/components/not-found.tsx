import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { useRandomQuote } from '@/hooks/use-random-quote'

export function NotFound() {
  const { quote, loading } = useRandomQuote()

  return (
    <div>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold mb-2">
          Page Not Found
        </h1>

        <p className="text-muted-foreground/60 mb-6 max-w-md italic">
          ~ {loading ? 'Fetching lost wisdom...' : quote}
        </p>

        <div>
          <Button className="font-bold" asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
