"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

interface StatsTooltipProviderProps {
  stats: {
    value: string;
    label: string;
    tooltip?: string;
  }[];
}

const StatsTooltipProvider: React.FC<StatsTooltipProviderProps> = ({
  stats,
}) => {
  return (
    <div className="flex justify-around items-center mb-6 text-sm max-w-md mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center px-2">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex items-center justify-center">
            {stat.value}
            {stat.tooltip && (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="ml-1.5 cursor-pointer">
                    <Info className="text-muted-foreground h-3 w-3" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2 text-sm">
                  <p dangerouslySetInnerHTML={{ __html: stat.tooltip }} />
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsTooltipProvider;
