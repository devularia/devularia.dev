import * as React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { routes } from '@/constants'
import { useIsMobile } from '@/hooks/use-mobile'
import { Menu } from 'lucide-react'
import { NavItem } from './item'
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { NavMobile } from './mobile'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { User } from '../lanyard/user'
import Activity from '../lanyard/activity'
import Spotify from '../lanyard/spotify'
import { GridPattern } from '@/components/magicui/grid-pattern'
import { Button } from '../ui/button'
import type { PropsWithChildren } from 'react'

export function NavMain() {
  const { location } = useRouterState()
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)
  const active = location.pathname === '/'

  return (
    <nav className="sticky top-0 inset-x-0 z-50 pointer-events-none">
      <div className="bg-primary/5 backdrop-blur-sm w-full h-10 sticky top-0 flex items-center justify-center px-4 pt- z-50">
        <span className="text-sm sm:text-base font-medium text-center text-foreground">
          This website is currently undergoing updates and is still under development.
        </span>
      </div>

      {!isMobile && (
        <>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
            <div className="pointer-events-auto">
              <Activity />
            </div>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
            <div className="pointer-events-auto">
              <Spotify />
            </div>
          </div>
        </>
      )}

      <motion.div className="mx-auto max-w-[70rem] w-full px-4 pointer-events-auto relative transition-all duration-500 ease-in-out">
        <div className="flex items-center gap-3 relative py-4">
          <div className="flex-1 relative flex items-center justify-between rounded-xl border border-border overflow-hidden backdrop-blur-sm h-[4rem] px-4">
            <div className="absolute inset-0 -z-[5] pointer-events-none">
              <GridPattern
                width={20}
                height={20}
                x={-1}
                y={-1}
                className={cn(
                  '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] opacity-30 dark:opacity-60'
                )}
              />
            </div>

            <Link
              to="/"
              className="relative flex items-center gap-2 text-md font-semibold text-primary whitespace-nowrap"
            >
              <img
                src="/logo.svg"
                className="w-8 h-8 object-contain fill-foreground"
              />
              {!isMobile && (
                <span className="ml-1 text-foreground font-medium select-none">
                  devularia.dev
                </span>
              )}

              {active && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className={cn(
                    'pointer-events-none absolute top-[45px] h-[2px] rounded-sm origin-center bg-gradient-to-r from-transparent via-primary/60 to-transparent',
                    isMobile ? 'left-1/2 -translate-x-1/2 w-8' : 'left-[40px] right-0'
                  )}
                />
              )}
            </Link>

            {!isMobile && (
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 pointer-events-auto z-10">
                {routes.map((item) => (
                  <NavItem key={item.to} {...item} />
                ))}
              </div>
            )}

            <div className="flex items-center">
              <User />

              {isMobile && (
                <Sheet open={open} onOpenChange={setOpen} modal={false}>
                  <SheetTrigger asChild>
                    <Button
                      variant={'outline'}
                      className="p-2 mr-2 rounded-lg hover:bg-foreground/10"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-[82%] max-w-sm p-0 flex flex-col bg-transparent backdrop-blur-3xl"
                  >
                    <SheetHeader className="px-5 py-[39.4px] border-b border-border" />
                    <div className="flex-1 overflow-y-auto">
                      <NavMobile />
                    </div>
                    {isMobile && (
                      <div className="fixed bottom-6 left-2 z-40 flex flex-col items-start gap-2 pointer-events-none">
                        <div className="pointer-events-auto w-full flex justify-start">
                          <Activity />
                        </div>

                        <div className="pointer-events-auto w-full flex justify-start">
                          <Spotify />
                        </div>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}

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