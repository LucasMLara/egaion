import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-wrap gap-6 py-10 items-center justify-center">
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton
              key={index}
              className="min-w-64 min-h-64 size-64 bg-[#e0e0e0] [animation-duration:1s]"
            />
          ))}
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
