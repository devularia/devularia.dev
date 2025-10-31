import { NavMain } from '@/components/navbar/main'
import type { PropsWithChildren } from 'react'

export function NavShell({ children }: PropsWithChildren) {
  return (
    <div>
      <NavMain />
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[70rem] px-4">
          {children}
        </div>
      </main>
    </div>
  )
}
