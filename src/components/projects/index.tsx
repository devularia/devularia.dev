import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip"
import { useGitHubProjects } from "@/hooks/use-githubrepo"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Projects() {
  const { projects, error, loading } = useGitHubProjects("devularia")

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>
  }

  return (
    <div className="py-2">
      <TooltipProvider delayDuration={200}>
        {loading ? (
          null
        ) : projects.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <div
                key={i}
                className="relative bg-card/80 border border-border/50 backdrop-blur-xl rounded-2xl overflow-hidden h-full flex flex-col shadow-lg"
              >
                <div className="relative w-full aspect-[15/9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-10 z-0" />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <FaGithub className="w-24 h-24 md:w-28 md:h-28 text-primary/50" aria-hidden="true" />
                  </div>

                  <div className="absolute inset-0 flex items-end p-3 z-20">
                    <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
                  </div>
                </div>


                <div className="flex justify-center gap-2 p-4 bg-background/60 border-t backdrop-blur-md mt-auto">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="flex-1"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        View Preview
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center">
                      See short preview
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() =>
                          window.open(project.repositoryUrl, "_blank")
                        }
                        aria-label="See code on GitHub"
                      >
                        <FaGithub />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      See code on GitHub
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}
      </TooltipProvider>
    </div>
  )
}
