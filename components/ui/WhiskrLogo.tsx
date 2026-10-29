import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/assets/whiskr-text-logo.png";

type WhiskrLogoProps = {
  className?: string;
  href?: string;
  priority?: boolean;
};

export function WhiskrLogo({ className, href = "/", priority = false }: WhiskrLogoProps) {
  const img = (
    <Image
      src={LOGO_SRC}
      alt="whiskr.ai"
      width={140}
      height={28}
      className={cn("h-6 sm:h-7 w-auto", className)}
      priority={priority}
      quality={75}
      sizes={priority ? "140px" : "120px"}
    />
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center shrink-0">
        {img}
      </Link>
    );
  }

  return img;
}
