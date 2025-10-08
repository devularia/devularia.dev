import React from "react"

export function useIsAtBottom(threshold = 16) {
  const [atBottom, setAtBottom] = React.useState(false)

  React.useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          const doc = document.documentElement
          const at =
            window.innerHeight + window.scrollY >= doc.scrollHeight - threshold
          setAtBottom(at)
          ticking = false
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return atBottom
}