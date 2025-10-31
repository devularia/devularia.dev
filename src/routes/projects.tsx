import { Background } from "@/components/background"
import Projects from "@/components/projects"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/projects")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Background imageUrl="/backgrounds/nature/2.png" />
      <Projects />
    </>
  )
}
