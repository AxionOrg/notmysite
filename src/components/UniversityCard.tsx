"use client";

import React from "react";
import type { University } from "@/lib/supabase/database.types";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface UniversityCardProps {
  university: University;
}

const UniversityCard = React.memo(function UniversityCard({
  university,
}: UniversityCardProps) {
  const universityLink = university.link;
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-card border border-border rounded-xl shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 overflow-hidden dark:hover:bg-accent"
    >
      <AccordionItem value={university.shortName} className="border-none">
        <AccordionTrigger className="p-4 w-full flex justify-between items-center cursor-pointer hover:no-underline [&[data-state=open]>svg.chevron]:-rotate-180 text-foreground">
          <div className="flex items-center gap-4 text-left w-full">
            <Image
              src={university.logo}
              alt={`${university.nameEn} logo`}
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="flex flex-col flex-grow">
              <span className="font-bold text-foreground">
                {university.nameBn} ({university.shortName})
              </span>
              <span className="text-sm text-muted-foreground">
                {university.nameEn}
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-4 pb-4 border-t border-border/50">
            <p className="text-muted-foreground my-3 text-sm">
              {university.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`${universityLink}#Circular`}>
                  <FileText /> সার্কুলার
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`${universityLink}#QuestionBank`}>
                  <BookOpen /> প্রশ্নব্যাংক
                </Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href={universityLink}>
                  বিস্তারিত <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});

export default UniversityCard;
