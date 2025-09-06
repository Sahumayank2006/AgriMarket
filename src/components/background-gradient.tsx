"use client";

import { cn } from "@/lib/utils";

export function BackgroundGradient() {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 h-full w-full bg-[url(https://picsum.photos/1920/1080?random=12)] bg-cover bg-center bg-no-repeat",
          "bg-fixed"
        )}
        data-ai-hint="farming landscape"
      ></div>
    </div>
  );
}
