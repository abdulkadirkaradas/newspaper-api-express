import { Newspaper } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Newspaper className="h-6 w-6" />
      <span className="text-lg font-bold">Newspaper</span>
    </div>
  );
}
