import { useEffect, useState } from 'react'

export function useRandomQuote() {
  const [quote, setQuote] = useState<string>('Loading wisdom...')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.slip?.advice) setQuote(data.slip.advice)
        else setQuote('Even the internet gets lost sometimes.')
      })
      .catch(() => setQuote('Looks like we lost this page in the void.'))
      .finally(() => setLoading(false))
  }, [])

  return { quote, loading }
}
