import { Link, useRouterState } from '@tanstack/react-router'
import { routes } from '@/constants'
import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function NavMobile() {
  const { location } = useRouterState()

  return (
    <nav className="p-3">
      <div className="mb-3 flex items-center">
        <span className="text-sm font-medium text-foreground/70">Menu</span>
      </div>

      <ul className="space-y-2 relative mb-3">
        {routes.map((item) => {
          const active = location.pathname === item.to
          return (
            <li key={item.to} className="relative">
              {active && (
                <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-foreground" />
              )}
              <SheetClose asChild>
                <Button
                  variant={active ? 'default' : 'outline'}
                  className={cn(
                    'w-full justify-start text-base transition-colors',
                    active && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  asChild
                >
                  <Link to={item.to} className="block w-full text-left px-3 py-2">
                    {item.label}
                  </Link>
                </Button>
              </SheetClose>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
