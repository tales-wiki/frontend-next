import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-8 w-24 mb-5" />
      <div className="flex flex-col gap-5">
        <div className="grid lg:grid-cols-6 grid-cols-3 gap-1">
          {Array.from({ length: 14 }).map((_, index) => (
            <div key={index} className="flex flex-col border border-slate-300">
              <Skeleton className="h-6" />
              <div className="p-1 flex flex-col lg:gap-1 gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-6 grid-cols-3 gap-1">
          {Array.from({ length: 26 }).map((_, index) => (
            <div key={index} className="flex flex-col border border-slate-300">
              <Skeleton className="h-6" />
              <div className="p-1 flex flex-col lg:gap-1 gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-6 grid-cols-3 gap-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col border border-slate-300">
              <Skeleton className="h-6" />
              <div className="p-1 flex flex-col lg:gap-1 gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
