import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Download } from "lucide-react";
import ExternalLink from "./common/ExternalLink";

interface LinkItem {
  text: string;
  url: string;
}

interface ItemGroup {
  title?: string;
  links: LinkItem[];
}

interface QuestionBankAccordionProps {
  value: string;
  title: string;
  items: ItemGroup[];
}

const QuestionBankAccordion: React.FC<QuestionBankAccordionProps> = React.memo(
  function QuestionBankAccordion({ value, title, items }) {
    return (
      <AccordionItem
        value={value}
        className="border border-border rounded-lg bg-card hover:bg-accent/50 transition-all duration-300"
      >
        <AccordionTrigger className="p-3 text-base font-bold hover:no-underline">
          <div className="flex items-center">
            <FileText className="inline-block mr-2" size={16} />
            <span>{title}</span>
          </div>
          <Download size={16} />
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0 text-muted-foreground text-base">
          {items.map((group, index) => (
            <div key={index} className="mb-2 last:mb-0">
              {group.title && <b className="text-foreground">{group.title}</b>}
              {group.links.map((link, linkIndex) => (
                <div key={linkIndex}>
                  ● <ExternalLink href={link.url} text={link.text} />
                </div>
              ))}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  },
);

export default QuestionBankAccordion;
