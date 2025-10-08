import { Skeleton } from "../ui/skeleton";

export function ProjectSkeleton() {
  return (
    <div className="relative bg-card/80 border border-border/50 backdrop-blur-xl rounded-2xl overflow-hidden h-full flex flex-col shadow-lg">
      <div className="relative w-full h-[75%] overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-background/70 flex items-end p-3">
          <Skeleton className="h-7 w-40 rounded-md" />
        </div>
      </div>
      <div className="flex justify-center gap-2 p-4 bg-background/60 border-t backdrop-blur-md mt-auto">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-12 rounded-md" />
      </div>
    </div>
  )
}