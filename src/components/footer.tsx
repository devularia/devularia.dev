import { motion, AnimatePresence } from 'framer-motion'
import { GridPattern } from '@/components/magicui/grid-pattern'
import { cn } from '@/lib/utils'
import Aurora from './bits/aurora'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from 'react-icons/io'
import { useIsAtBottom } from '@/hooks/use-isbottom'
import Activity from './lanyard/activity'
import Spotify from './lanyard/spotify'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Footer() {
  const show = useIsAtBottom(16)
  const isMobile = useIsMobile()

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.footer
          key="footer"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 36,
            mass: 0.6,
          }}
          className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
        >
          {isMobile && (
          <div className="fixed bottom-30 left-2 z-40 flex flex-col items-start gap-2 pointer-events-none">
            <div className="pointer-events-auto w-full flex justify-start">
              <Activity />
            </div>

            <div className="pointer-events-auto w-full flex justify-start">
              <Spotify />
            </div>
          </div>
        )}
          <div className="mx-auto max-w-[60rem] w-full px-4 pointer-events-auto">
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 rounded-t-3xl border border-border border-b-0 overflow-hidden backdrop-blur-sm py-4 px-6 bg-background/60">
              <div className="absolute inset-0 -z-[5] pointer-events-none">
                <GridPattern
                  width={20}
                  height={20}
                  x={-1}
                  y={-1}
                  className={cn(
                    '[mask-image:linear-gradient(to_top_right,white,transparent,transparent)] opacity-30 dark:opacity-60'
                  )}
                />
                <Aurora direction='bottom' />
              </div>

              <p className="text-sm text-foreground/80 select-none">
                © {new Date().getFullYear()} devularia.dev - this website is <a className='hover:underline font-bold' href="https://github.com/devularia/devularia.dev">opensource</a>
              </p>

              <div className="flex items-center gap-4 text-foreground/80">
                <a
                  href="https://github.com/devularia"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://x.com/devularia"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <FaXTwitter size={20} />
                </a>
                <a
                  href="mailto:contato@devularia.dev"
                  className="hover:text-primary transition-colors"
                >
                  <IoIosMail size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}