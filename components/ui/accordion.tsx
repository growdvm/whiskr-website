"use client"

import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const accordionContentVariants = {
  open: {
    height: "auto" as const,
    opacity: 1,
    filter: "blur(0px)",
  },
  closed: {
    height: 0,
    opacity: 0,
    filter: "blur(4px)",
  },
}

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function AccordionItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

function AccordionTrigger({
  children,
  className,
  showIcon = true,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  showIcon?: boolean
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        {showIcon && (
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const element = contentRef.current?.parentElement
    if (!element) return

    const observer = new MutationObserver(() => {
      const state = element.getAttribute("data-state")
      setIsOpen(state === "open")
    })

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    })

    // Set initial state
    const initialState = element.getAttribute("data-state")
    setIsOpen(initialState === "open")

    return () => observer.disconnect()
  }, [])

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      ref={contentRef}
      {...props}
    >
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={accordionContentVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div className={cn("pb-4 pt-0 text-sm", className)}>
          {children}
        </div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
