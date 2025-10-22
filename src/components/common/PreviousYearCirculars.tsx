"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import ExternalLink from "./ExternalLink";

interface Circular {
  href: string;
  text: string;
}

interface PreviousYearCircularsProps {
  circulars?: Circular[];
}

const PreviousYearCirculars: React.FC<PreviousYearCircularsProps> = ({
  circulars,
}) => {
  const [infoBoxVisible, setInfoBoxVisible] = useState(false);
  const toggleInfoBox = () => setInfoBoxVisible(!infoBoxVisible);

  if (!circulars || circulars.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        className="text-primary border-primary flex-1 min-w-[150px] hover:bg-primary hover:text-primary-foreground"
        onClick={toggleInfoBox}
      >
        পূর্ববর্তী বছরের সার্কুলার <ChevronRight size={16} className="ml-2" />
      </Button>
      {infoBoxVisible && (
        <div className="mt-[15px] p-[15px] border border-border border-l-4 border-l-primary bg-accent rounded-md text-left w-full text-base animate-accordion-down">
          {circulars.map((circular, index) => (
            <React.Fragment key={index}>
              ●{" "}
              <ExternalLink
                href={circular.href}
                text={circular.text}
                showIcon={circular.href.startsWith("http")}
              />
              {index < circulars.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default PreviousYearCirculars;
