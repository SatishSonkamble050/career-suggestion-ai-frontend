import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type SpinnerProps = {
  size?: number;
  className?: string;
  text?: string;
};

export default function Spinner({ size = 24, className, text }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2
        size={size}
        className={cn("animate-spin text-gray-600", className)}
      />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
}