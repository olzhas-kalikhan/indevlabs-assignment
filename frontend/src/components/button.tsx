import { cn } from "~/utils";

export default function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("border border-input shadow-sm rounded-sm px-2 cursor-pointer text-nowrap", className)}
      {...props}
    />
  );
}
