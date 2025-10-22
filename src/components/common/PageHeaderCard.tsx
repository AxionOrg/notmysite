"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Info } from "lucide-react";
import React from "react";
import StatsTooltipProvider from "./StatsTooltipProvider";

interface PageHeaderCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  stats: {
    value: string;
    label: string;
    tooltip?: string;
  }[];
  button?: {
    href: string;
    label: string;
    icon?: React.ReactNode;
  };
}

const PageHeaderCard = ({
  icon,
  title,
  subtitle,
  description,
  stats,
  button,
}: PageHeaderCardProps) => {
  return (
    <div className="mt-20 w-full border border-border bg-card rounded-2xl p-4 sm:p-8 shadow-lg text-center relative">
      <div className="w-20 h-20 sm:w-24 sm:h-24 absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-card rounded-2xl shadow-xl z-10 flex items-center justify-center p-1">
        {icon}
      </div>
      <div className="pt-10 sm:pt-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-2 text-foreground">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground mb-4">({subtitle})</p>
        <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      {stats && stats.length > 0 && <StatsTooltipProvider stats={stats} />}
      {button && (
        <Button asChild className="rounded-[8px]">
          <Link href={button.href}>
            {button.icon ? button.icon : <Info size={16} />} {button.label}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PageHeaderCard;
