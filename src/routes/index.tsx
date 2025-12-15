import { Background } from '@/components/background'
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'
import { createFileRoute } from '@tanstack/react-router'
import { FaLink } from "react-icons/fa";
import { ImRocket } from "react-icons/im";
import { Carder } from '@/components/ui/carder';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})


function RouteComponent() {
  const cards = [
      {
        icon: "/logo.svg",
        title: "Who Am I?",
        path: "/about",
        description: "Who is Devularia?",
      },
      {
        icon: <ImRocket />,
        title: "Future",
        path: "/future",
        description: "A list of all my future plans",
      },
      {
        icon: <FaLink />,
        title: "Social Media",
        path: "/social",
        description: "All my social media accounts",
      },
    ];
  return (
    <div className="relative flex flex-col items-center">
      <Background imageUrl="/backgrounds/nature/2.png" />

      <header className="relative w-full flex flex-col items-center justify-center overflow-hidden py-20 px-4 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground relative z-10">
          devularia.dev
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{
              duration: 0.60,
              ease: [0.33, 1, 0.68, 1],
            }}
            className={cn('pointer-events-none absolute inset-x-0 top-[63px] h-[2px]', 'origin-center bg-gradient-to-r from-transparent via-primary/80 to-transparent'
            )}
          />
        </h1>
      </header>
      
     <Carder cards={cards} />
    </div>
  )
}
