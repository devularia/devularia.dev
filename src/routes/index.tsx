import { Background } from '@/components/background'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Background imageUrl="/backgrounds/nature/1.png" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 gap-4">
        <p className="text-foreground/90">
          I'm too lazy to create the "/" page rn
        </p>
      </div>
    </>
  )
}
