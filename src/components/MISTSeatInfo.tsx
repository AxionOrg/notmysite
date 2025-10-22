"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Info, Bookmark } from "lucide-react";
import { allData } from "@/lib/data/_generated";
import type { Subject } from "@/lib/supabase/database.types";
import ExternalLink from "./common/ExternalLink";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SeatCellProps {
  seat: number | string;
  tooltip?: string;
}

const SeatCell: React.FC<SeatCellProps> = ({ seat, tooltip }) => {
  if (!tooltip) {
    return <span>{seat}</span>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="flex items-center justify-center gap-1.5 cursor-pointer">
          {seat}
          <Info className="h-3 w-3 text-muted-foreground" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 text-sm">
        <div dangerouslySetInnerHTML={{ __html: tooltip }} />
      </PopoverContent>
    </Popover>
  );
};

interface SubjectTableProps {
  subjects: Subject[];
}

const SubjectTable: React.FC<SubjectTableProps> = ({ subjects }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchBookmarks = useCallback(async () => {
    const localBookmarks = localStorage.getItem("subjectBookmarks");
    if (localBookmarks) {
      setBookmarks(JSON.parse(localBookmarks));
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const toggleBookmark = async (subjectId: string) => {
    const isBookmarked = bookmarks.includes(subjectId);
    let newBookmarks: string[];

    const currentBookmarks = bookmarks;
    if (isBookmarked) {
      newBookmarks = currentBookmarks.filter((id) => id !== subjectId);
    } else {
      newBookmarks = [...currentBookmarks, subjectId];
    }
    localStorage.setItem("subjectBookmarks", JSON.stringify(newBookmarks));

    setBookmarks(newBookmarks);
    toast({
      title: isBookmarked
        ? "বুকমার্ক সরানো হয়েছে"
        : "বিষয়টি বুকমার্ক করা হয়েছে",
    });
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.short.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="🔎 বিষয় খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8"
        />
      </div>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[5%]"></TableHead>
            <TableHead className="text-center w-[25%]">নাম</TableHead>
            <TableHead className="text-center w-[15%]">আসন</TableHead>
            <TableHead className="text-center w-[15%]">রিভিউ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubjects.map((subject, index) => (
            <TableRow key={index} className="text-center">
              <TableCell>
                <Bookmark
                  className={cn(
                    "h-5 w-5 cursor-pointer text-muted-foreground/30 transition-all hover:scale-125",
                    bookmarks.includes(subject.short) &&
                      "text-primary fill-primary",
                  )}
                  onClick={() => toggleBookmark(subject.short)}
                />
              </TableCell>
              <TableCell className="font-bold whitespace-pre-wrap break-words">
                {subject.fullName}
              </TableCell>
              <TableCell className="whitespace-pre-wrap break-words">
                <SeatCell seat={subject.seat} tooltip={subject.tooltip} />
              </TableCell>
              <TableCell className="whitespace-pre-wrap break-words">
                <ExternalLink href={subject.reviewLink} text="[লিংক]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

interface MISTSubjects {
  unitA: Subject[];
}

const MISTSeatInfo = () => {
  const mistData = allData.universities.find((uni) => uni.id === "mist");

  if (!mistData || !mistData.subjects) {
    return <div>MIST এর বিষয়ভিত্তিক আসনের তথ্য পাওয়া যায়নি।</div>;
  }

  const subjects = mistData.subjects as MISTSubjects;
  const safeUnitA = subjects.unitA || [];

  return (
    <div
      id="Subjects"
      className="mt-4 w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg text-center relative"
    >
      <div className="flex justify-center">
        <div className="gradient-background inline-block px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
          সাবজেক্ট প্রতি সিট সংখ্যা ও রিভিউ
        </div>
      </div>
      <SubjectTable subjects={safeUnitA} />
    </div>
  );
};

export default MISTSeatInfo;
