import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({ className, iconSize = 28 }: { className?: string; iconSize?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/brand/join-symbol.png"
        alt=""
        width={iconSize}
        height={iconSize}
        style={{ width: iconSize, height: iconSize }}
        priority
      />
      <span className="text-lg font-semibold tracking-tight text-gradient">JOIN</span>
    </span>
  );
}
