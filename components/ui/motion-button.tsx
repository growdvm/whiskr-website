"use client";

import { cn } from "@/lib/utils";

type MotionButtonProps = {
  label: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  size?: "default" | "lg";
};

export function MotionButton({ label, className, href, onClick, size = "default" }: MotionButtonProps) {
  const shellClasses = cn(
    "group relative inline-flex cursor-pointer items-center overflow-hidden rounded-full border border-[#e2e8f0]/90 bg-white/95 pl-1.5 outline-none no-underline shadow-[0_4px_14px_rgba(28,232,129,0.14)] transition-shadow duration-300 hover:shadow-[0_6px_22px_rgba(28,232,129,0.28)]",
    size === "lg"
      ? "h-16 min-h-16 gap-4 pr-12"
      : "h-[52px] min-h-[52px] sm:h-14 sm:min-h-14 gap-3 sm:gap-4 pr-7 sm:pr-10",
    className,
  );

  const circleSize =
    size === "lg" ? "h-[3.25rem] w-[3.25rem]" : "h-11 w-11 sm:h-12 sm:w-12";
  const textClasses = cn(
    "relative z-10 whitespace-nowrap font-bold tracking-tight text-[#101235] duration-500",
    size === "lg" ? "text-lg" : "text-[15px] sm:text-[17px]",
  );

  const content = (
    <>
      <span
        className={cn(
          "absolute left-1.5 top-1/2 m-0 block -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1ce881] to-[#24ffc9] duration-500 ease-out group-hover:w-[calc(100%-12px)]",
          circleSize,
        )}
        aria-hidden="true"
      />
      <span className={cn("relative z-10 shrink-0", circleSize)} aria-hidden="true" />
      <span className={textClasses}>{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={shellClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={shellClasses}>
      {content}
    </button>
  );
}

export default MotionButton;
