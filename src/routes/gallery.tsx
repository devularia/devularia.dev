import { Background } from "@/components/background"
import Gallery from "@/components/gallery"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Background imageUrl="/backgrounds/nature/2.png" />
      <Gallery />
    </>
  )
}
