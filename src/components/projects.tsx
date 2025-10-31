import { FaGithub } from "react-icons/fa";
import { useGitHubProjects } from "@/hooks/use-githubrepo";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function Projects() {
  const { projects, error, loading } = useGitHubProjects("devularia");

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  return (
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
              className="rounded-2xl backdrop-blur-sm border transition-all duration-300 p-4 flex flex-row items-start text-left hover:shadow-lg hover:bg-card cursor-pointer"
              onClick={() => window.open(project.repositoryUrl, "_blank")}
            >
              <div className="mr-4 bg-secondary/50 rounded-xl w-10 h-10 flex items-center justify-center shadow-sm flex-shrink-0">
                <FaGithub className="text-xl" />
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-1 line-clamp-3 break-words">
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
  );
}
