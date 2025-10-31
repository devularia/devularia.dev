import { TooltipProvider } from "./ui/tooltip"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { FaImage } from "react-icons/fa"
import { ImageDialog } from "./ui/image-dialog"

type ImageItem = {
  imageUrl: string
}

const imageUrl: ImageItem[] | undefined = undefined

export default function Gallery() {
  const images = imageUrl ?? []
  const loading = false
  const error = null

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>
  }

  return (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[70rem] w-full">
            {images.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl backdrop-blur-sm border transition-shadow duration-300 flex flex-col items-start text-left hover:shadow-lg"
              >
                <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-xl">
                  <ImageDialog imageUrl={item.imageUrl} />
                </div>
              </div>
            ))}
          </div>
        )}
      </TooltipProvider>
    </div>
  )
}
