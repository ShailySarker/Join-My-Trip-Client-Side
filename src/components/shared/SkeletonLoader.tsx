import { cn } from "@/lib/utils";

export function SkeletonLoader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <SkeletonLoader className="h-48 w-full rounded-md" />
      <SkeletonLoader className="h-6 w-3/4" />
      <SkeletonLoader className="h-4 w-full" />
      <SkeletonLoader className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <SkeletonLoader className="h-10 w-24" />
        <SkeletonLoader className="h-10 w-24" />
      </div>
    </div>
  );
}

export function TravelPlanSkeleton() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <SkeletonLoader className="h-56 w-full" />
      <div className="p-6 space-y-4">
        <SkeletonLoader className="h-7 w-3/4" />
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-5/6" />
        <div className="flex gap-4 pt-4">
          <SkeletonLoader className="h-4 w-20" />
          <SkeletonLoader className="h-4 w-20" />
        </div>
        <SkeletonLoader className="h-10 w-full" />
      </div>
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <SkeletonLoader className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader className="h-5 w-32" />
          <SkeletonLoader className="h-4 w-24" />
        </div>
      </div>
      <SkeletonLoader className="h-4 w-full" />
      <SkeletonLoader className="h-4 w-4/5" />
      <div className="flex gap-2 pt-2">
        <SkeletonLoader className="h-9 w-full" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center">
      <div className="container px-4 py-32 text-center space-y-6">
        <SkeletonLoader className="h-16 w-3/4 mx-auto" />
        <SkeletonLoader className="h-6 w-2/3 mx-auto" />
        <div className="flex gap-4 justify-center pt-8">
          <SkeletonLoader className="h-12 w-40" />
          <SkeletonLoader className="h-12 w-40" />
        </div>
        <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
          <SkeletonLoader className="h-20 w-full" />
          <SkeletonLoader className="h-20 w-full" />
          <SkeletonLoader className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonLoader className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader className="h-4 w-28" />
          <SkeletonLoader className="h-3 w-20" />
        </div>
      </div>
      <SkeletonLoader className="h-4 w-full" />
      <SkeletonLoader className="h-4 w-full" />
      <SkeletonLoader className="h-4 w-3/4" />
    </div>
  );
}
