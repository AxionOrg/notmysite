"use client";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Landmark,
  University,
  ArrowUpRightFromSquare,
  History,
  Map,
} from "lucide-react";
import { allData } from "@/lib/data/_generated";
import ExternalLink from "./common/ExternalLink";

// Define proper TypeScript interfaces
interface HistorySourceLink {
  text: string;
  url: string;
}

interface HistoryData {
  title: string;
  paragraphs: string[];
  source: {
    label: string;
    links: HistorySourceLink[];
  };
}

interface MapLocation {
  name: string;
  url: string;
}

interface MapCategory {
  name: string;
  locations: MapLocation[];
}

interface MapLocationsData {
  title: string;
  categories: MapCategory[];
}

interface HistoryAndMapData {
  history: HistoryData;
  mapLocations: MapLocationsData;
}

const DhakaHistoryAndMap = () => {
  const duData = allData.universities.find((uni) => uni.id === "du");

  if (!duData || !duData.historyAndMap) {
    return <div>ঢাকা বিশ্ববিদ্যালয়ের ইতিহাস ও ম্যাপের তথ্য পাওয়া যায়নি।</div>;
  }

  const { history, mapLocations } = duData.historyAndMap as HistoryAndMapData;

  return (
    <div className="mt-4">
      <Accordion type="multiple" className="w-full space-y-4">
        <AccordionItem
          value="item-1"
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
        >
          <AccordionTrigger className="p-4 sm:p-5 w-full flex justify-between items-center text-lg font-bold cursor-pointer hover:no-underline">
            <div className="flex items-center">
              <History className="mr-2" />
              <span>{history.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 sm:p-5 border-t border-border/50 text-base text-muted-foreground">
            <p className="mb-4 last:mb-0">
              <b>ঢাকা বিশ্ববিদ্যালয় (ঢাবি)</b> বাংলাদেশের সর্বপ্রথম এবং অন্যতম
              প্রধান উচ্চশিক্ষা প্রতিষ্ঠান, যা ১৯২১ সালের ১ জুলাই প্রতিষ্ঠিত
              হয়। এটি ব্রিটিশ ভারতের অক্সব্রিজ মডেল অনুসরণে গঠিত হয়েছিল এবং
              শুরুতে তিনটি অনুষদ (কলা, বিজ্ঞান ও আইন) এবং ১২টি বিভাগ নিয়ে
              যাত্রা শুরু করে।
            </p>
            {history.paragraphs.slice(1).map((p: string, i: number) => (
              <p key={i + 1} className="mb-4 last:mb-0">
                {p}
              </p>
            ))}
            <hr className="my-3 border-border/50" />
            <b>{history.source.label}</b>
            <br />
            {history.source.links.map((link: HistorySourceLink, i: number) => (
              <div key={i}>
                {String(i + 1).padStart(2, "0")}.{" "}
                <ExternalLink href={link.url} text={link.text} />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg mt-4"
        >
          <AccordionTrigger className="p-4 sm:p-5 w-full flex justify-between items-center text-lg font-bold cursor-pointer hover:no-underline">
            <div className="flex items-center">
              <Map className="mr-2" />
              <span>{mapLocations.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 sm:p-5 border-t border-border/50 text-base text-muted-foreground">
            <Accordion type="multiple" className="w-full">
              {mapLocations.categories.map(
                (category: MapCategory, i: number) => (
                  <AccordionItem key={i} value={`sub-${i}`}>
                    <AccordionTrigger className="hover:no-underline flex items-center justify-between">
                      {category.name === "মসজিদ" ? (
                        <Landmark className="mr-2" />
                      ) : (
                        <University className="mr-2" />
                      )}
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableBody>
                          {category.locations.map(
                            (loc: MapLocation, j: number) => (
                              <TableRow key={j}>
                                <TableCell className="text-center">
                                  {loc.name}
                                </TableCell>
                                <TableCell className="text-center">
                                  <ExternalLink href={loc.url} text="[দেখুন]" />
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ),
              )}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DhakaHistoryAndMap;
