"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PrefetchDashboardLink() {
  const router = useRouter();

  return (
    <Link
      href="/dashboard"
      onMouseEnter={() => router.prefetch("/dashboard")}
      className="group shrink-0 flex items-center gap-1 whitespace-nowrap bg-muted-foreground hover:bg-muted-foreground/80 pl-3 pr-2.5 md:pl-4 md:pr-3.5 min-[97.5rem]:pl-5 min-[97.5rem]:pr-4 h-9 md:h-10 lg:h-10 xl:h-10 2xl:h-11 min-[97.5rem]:h-12 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base min-[97.5rem]:text-base font-medium shadow-sm transition-[background-color,transform] duration-150 ease focus:outline-none active:scale-[0.97] motion-reduce:transition-none text-white"
    >
      Dashboard
    </Link>
  );
}
