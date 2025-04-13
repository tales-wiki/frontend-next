import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-primary/5 animate-pulse", className)}
      {...props}
    />
  );
}

export { Skeleton };
