import { Background } from '@/components/background'
import { Cards } from '@/components/cards'
import { Header } from '@/components/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex flex-col items-center">
      <Background imageUrl="/backgrounds/nature/2.png" />

      <Header />
      <Cards />
    </div>
  )
}
