import { cn } from "~/utils";

export default function Checkbox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex justify-center items-center px-2">
      <input
        type="checkbox"
        className={cn(
          "peer h-9 w-9 shrink-0 border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}
