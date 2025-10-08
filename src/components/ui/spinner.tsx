import { cn } from "@/lib/utils"

function Spinner({ className }: React.ComponentProps<"svg">) {
  return (
    <img
      src="/logo.svg"
      className={cn("size-4 animate-pulse", className)}

    />
  )
}

export { Spinner }
