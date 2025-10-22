"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import React from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children);
  const lastChild = childrenArray[childrenArray.length - 1];

  const isCustomIcon = (child: React.ReactNode): child is React.ReactElement =>
    React.isValidElement(child) &&
    typeof child.type !== "string" &&
    (child.type === Download || child.type === ChevronDown);

  const hasCustomIcon = isCustomIcon(lastChild);
  const mainContent = hasCustomIcon ? childrenArray.slice(0, -1) : children;
  const icon = hasCustomIcon ? lastChild : null;

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg.chevron]:rotate-180",
          className,
        )}
        {...props}
      >
        {mainContent}
        {icon}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="pt-0 pb-4">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
