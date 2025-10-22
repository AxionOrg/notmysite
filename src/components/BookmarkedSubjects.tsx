"use client";

import React, { useState, useEffect, useCallback } from "react";
import { allData } from "@/lib/data/_generated";
import type { Subject } from "@/lib/supabase/database.types";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import ExternalLink from "./common/ExternalLink";
import { BookmarkX, University } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookmarkedSubject extends Subject {
  university: {
    name: string;
    unit: string;
  };
}

const BookmarkedSubjects = () => {
  const { toast } = useToast();
  const [bookmarkedSubjects, setBookmarkedSubjects] = useState<
    BookmarkedSubject[]
  >([]);
  const [loading, setLoading] = useState(true);

  const getAllSubjects = useCallback(() => {
    const subjectsWithUniversity: BookmarkedSubject[] = [];
    allData.universities.forEach((uni) => {
      if (uni.subjects) {
        Object.keys(uni.subjects).forEach((unitKey) => {
          const unitSubjects = (uni.subjects as any)[unitKey] as Subject[];
          if (Array.isArray(unitSubjects)) {
            unitSubjects.forEach((subject) => {
              subjectsWithUniversity.push({
                ...subject,
                university: {
                  name: uni.nameBn,
                  unit: unitKey.replace("unit", "").toUpperCase(),
                },
              });
            });
          }
        });
      }
    });
    return subjectsWithUniversity;
  }, []);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    const storedBookmarks = localStorage.getItem("subjectBookmarks");
    const subjectIds = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    const allSubjects = getAllSubjects();
    const subjects = allSubjects.filter((subject) =>
      subjectIds.includes(subject.short),
    );
    setBookmarkedSubjects(subjects);
    setLoading(false);
  }, [getAllSubjects]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const removeBookmark = async (subjectId: string) => {
    const stored = localStorage.getItem("subjectBookmarks");
    const currentBookmarks = stored ? JSON.parse(stored) : [];
    const newBookmarks = currentBookmarks.filter(
      (id: string) => id !== subjectId,
    );
    localStorage.setItem("subjectBookmarks", JSON.stringify(newBookmarks));

    toast({ title: "বুকমার্ক সরানো হয়েছে" });
    fetchBookmarks();
  };

  if (loading) {
    return <p>বুকমার্ক লোড হচ্ছে...</p>;
  }

  if (bookmarkedSubjects.length === 0) {
    return <p>আপনি এখনও কোনো বিষয় বুকমার্ক করেননি।</p>;
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>বিষয়</TableHead>
            <TableHead>বিশ্ববিদ্যালয়</TableHead>
            <TableHead className="text-center">আসন</TableHead>
            <TableHead className="text-center">রিভিউ</TableHead>
            <TableHead className="text-center">সরান</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookmarkedSubjects.map((subject, index) => (
            <TableRow key={`${subject.short}-${index}`}>
              <TableCell className="font-bold">
                <p>{subject.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  ({subject.short})
                </p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <University className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p>{subject.university.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ইউনিট: {subject.university.unit}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{subject.seat}</TableCell>
              <TableCell className="text-center">
                <ExternalLink href={subject.reviewLink} text="[রিভিউ]" />
              </TableCell>
              <TableCell className="text-center">
                <button
                  onClick={() => removeBookmark(subject.short)}
                  title="বুকমার্ক সরান"
                >
                  <BookmarkX className="h-5 w-5 text-destructive" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookmarkedSubjects;
