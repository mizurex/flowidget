import { cn } from "@/lib/utils";
export default function FadePattern({ className }: { className?: string } ) {
  return (
    <div
    className={cn("absolute h-[20px] w-full border border-b border-t border-white/10 text-white/10", className)}
    style={{
      backgroundImage:
        "repeating-linear-gradient(-35deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 4px)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      maskImage:
        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
    }}
  />
  );
}