import { Background } from '@/components/background'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gallery')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Background imageUrl='/backgrounds/gta/4.png'/>
}
