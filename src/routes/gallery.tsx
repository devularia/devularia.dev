import { Background } from "@/components/background"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FaImage } from "react-icons/fa";

import { createFileRoute } from "@tanstack/react-router"
import { TooltipProvider } from "@/components/ui/tooltip";
import { ImageDialog } from "@/components/ui/image-dialog";
import type { ImageItem } from "@/types/image";

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
})

const imageUrl: ImageItem[] | undefined = undefined;

function RouteComponent() {
  const images =
    imageUrl ??
    [
      {
        imageUrl: "https://cataas.com/cat",
        name: "Random Cat",
        description: "Each time you refresh this page, it randomizes the cat.",
      }
    ];

  const loading = false;
  return (
    <>
      <Background imageUrl="/backgrounds/nature/2.png" />
      <div>
        <TooltipProvider delayDuration={200}>
          {loading ? null : images.length === 0 ? (
            <div className="flex justify-center py-60">
              <Empty className="max-w-lg">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FaImage />
                  </EmptyMedia>
                  <EmptyTitle>No Images Yet</EmptyTitle>
                  <EmptyDescription>
                    I haven&apos;t added any gallery images yet.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[70rem] w-full">
              {images.map((item) => (
                <div className="relative group rounded-2xl overflow-hidden cursor-pointer border border-border/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-full overflow-hidden">
                    <ImageDialog imageUrl={item.imageUrl} />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-foreground bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TooltipProvider>
      </div>
    </>
  )
}
