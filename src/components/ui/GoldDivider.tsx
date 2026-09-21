import { cn } from "@/lib/utils";

export default function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("gold-divider", className)} role="presentation">
      <span className="h-1.5 w-1.5 rotate-45 border border-gold-soft bg-transparent" />
    </div>
  );
}
