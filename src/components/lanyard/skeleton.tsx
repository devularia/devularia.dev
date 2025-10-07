import { Skeleton } from "@/components/ui/skeleton";

export function ActivitySkeleton() {
    return (
        <div className="group relative flex items-center gap-2 px-3">
            <Skeleton className="h-11 w-11 shrink-0 rounded-md" />
            <div className="min-w-0 flex flex-col gap-1">
                <Skeleton className="h-3 w-[120px] rounded" />
                <Skeleton className="h-2 w-[80px] rounded" />
                <Skeleton className="h-2 w-[70px] rounded" />
            </div>
        </div>
    )
}