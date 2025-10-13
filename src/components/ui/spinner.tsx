import { cn } from "@/lib/utils"
import { CgSpinner } from "react-icons/cg";

function Spinner({ className }: React.ComponentProps<"svg">) {
  return (
    <CgSpinner className={cn("size-4 animate-spin", className)}/>
  )
}

export { Spinner }
