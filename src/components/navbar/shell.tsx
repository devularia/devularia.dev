import { NavMain } from '@/components/navbar/main'
import type { PropsWithChildren } from 'react'

export function NavShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavMain />
      <main className="flex-1 pt-28">
        {children}
      </main>
    </div>
  )
}
