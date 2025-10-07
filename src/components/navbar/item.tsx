import { Link, useRouterState } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItemProps {
  to: string
  label: string
}

export function NavItem({ to, label }: NavItemProps) {
  const { location } = useRouterState()
  const active = location.pathname === to

  return (
    <Link
      to={to}
      className="relative px-3 py-2"
    >
      <motion.span
        className={cn(
          'text-sm font-medium transition-colors duration-300',
          active
            ? 'text-foreground'
            : 'text-foreground/40 hover:text-foreground duration-300'
        )}
      >
        {label}
      </motion.span>

      {active && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{
            duration: 0.60,
            ease: [0.33, 1, 0.68, 1],
          }}
          className={cn('pointer-events-none absolute inset-x-0 top-[49px] h-[2px]', 'origin-center bg-gradient-to-r from-transparent via-primary/80 to-transparent'
          )}
        />
      )}
    </Link>
  )
}
