import { Background } from '@/components/background'
import Aurora from '@/components/bits/aurora'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Aurora/>
    <Background imageUrl='/backgrounds/gta/1.png'/>
  </div>
}
