"use client";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Landmark, University, History, Map } from "lucide-react";
import { allData } from "@/lib/data/_generated";
import ExternalLink from "./common/ExternalLink";
import type { University as UniversityType } from "@/lib/supabase/database.types";

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

interface SharedHistoryAndMapProps {
  university: UniversityType;
}

const SharedHistoryAndMap = ({ university }: SharedHistoryAndMapProps) => {
  const uniData = allData.universities.find((uni) => uni.id === university.id);

  if (!uniData || !uniData.historyAndMap) {
    return <div>এই বিশ্ববিদ্যালয়ের ইতিহাস ও ম্যাপের তথ্য পাওয়া যায়নি।</div>;
  }

  const { history, mapLocations } = uniData.historyAndMap as HistoryAndMapData;

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
            {history.paragraphs.map((p: string, i: number) => (
              <p key={i} className="mb-4 last:mb-0">
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
        {mapLocations && mapLocations.categories.length > 0 && (
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
              <Table>
                <TableBody>
                  {mapLocations.categories[0].locations.map(
                    (loc: MapLocation, j: number) => (
                      <TableRow key={j}>
                        <TableCell className="text-center">
                          {loc.name}
                        </TableCell>
                        <TableCell className="text-center">
                          <ExternalLink href={loc.url} text="[লিংক]" />
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default SharedHistoryAndMap;
