import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ImageDialog({ imageUrl }: { imageUrl: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full aspect-[15/9] overflow-hidden cursor-pointer group">
          <img
            src={imageUrl}
            className="object-cover w-full h-full transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
        <img
          src={imageUrl}
          className="w-full h-full rounded-xl object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}