import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="w-[400px] space-y-4">
      <Skeleton className="h-[250px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    </div>
  );
}
