import { Background } from "@/components/background"
import { FaGithub } from "react-icons/fa";
import { useGitHubProjects } from "@/hooks/use-githubrepo";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/projects")({
  component: RouteComponent,
})

function RouteComponent() {
  const { projects, loading } = useGitHubProjects("devularia");
  return (
    <>
      <Background imageUrl="/backgrounds/nature/2.png" />
      <div>
        {loading ? null : projects.length === 0 ? (
          <div className="flex justify-center py-60">
            <Empty className="max-w-lg">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FaGithub />
                </EmptyMedia>
                <EmptyTitle>No Projects Yet</EmptyTitle>
                <EmptyDescription>
                  I haven&apos;t created any public projects yet.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[70rem] w-full">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-2xl backdrop-blur-sm border border-border/50 transition-all duration-300 p-4 flex flex-row items-start text-left cursor-pointer hover:shadow-lg hover:bg-card/70"
                onClick={() => window.open(project.repositoryUrl, "_blank")}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition duration-500 pointer-events-none" />

                <div className="mr-4 bg-secondary/50 rounded-xl w-10 h-10 flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-secondary/60 transition-colors duration-300">
                  <FaGithub className="text-xl" />
                </div>

                <div className="flex flex-col relative z-10">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-3 break-words group-hover:text-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 break-all overflow-hidden max-w-full">
                    {project.description || "No description available."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
