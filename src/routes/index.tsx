import { Background } from '@/components/background'
import { Spinner } from '@/components/ui/spinner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Background imageUrl="backgrounds/nature/1.png" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Spinner className="w-10 h-10" />
      </div>
    </>
  )
}