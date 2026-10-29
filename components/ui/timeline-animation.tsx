"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
  animationNum: number;
  timelineRef?: React.RefObject<HTMLDivElement>;
}

export function TimelineContent({
  children,
  className,
  animationNum,
}: TimelineContentProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={
          isVisible
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(10px)" }
        }
        transition={{ duration: 0.5, delay: animationNum * 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
