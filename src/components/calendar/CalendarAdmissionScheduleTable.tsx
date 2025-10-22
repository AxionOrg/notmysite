"use client";

import React, { useState, useEffect } from "react";
import { allData } from "@/lib/data/_generated";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const toBengaliNumber = (num: number | string) => {
  const bengaliNumbers: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };
  return String(num).replace(/[0-9]/g, (match) => bengaliNumbers[match]);
};

const CountdownCell = ({ targetDate }: { targetDate: string | null }) => {
  const timeLeft = useCountdown(targetDate);

  if (timeLeft.completed) {
    return (
      <TableCell className="text-center align-top text-red-500 dark:text-red-400 whitespace-nowrap">
        পরীক্ষা হয়ে গেছে
      </TableCell>
    );
  }

  return (
    <TableCell className="text-center align-top font-bengali whitespace-nowrap text-xs sm:text-sm">
      <span className="tabular-nums">
        {toBengaliNumber(String(timeLeft.days).padStart(2, "0"))}
      </span>
      <span className="mr-1 hidden sm:inline">দিন</span>
      <span className="mr-1 sm:hidden">দি</span>
      <span className="tabular-nums">
        {toBengaliNumber(String(timeLeft.hours).padStart(2, "0"))}
      </span>
      <span className="mr-1 hidden sm:inline">ঘণ্টা</span>
      <span className="mr-1 sm:hidden">ঘ</span>
      <span className="tabular-nums">
        {toBengaliNumber(String(timeLeft.minutes).padStart(2, "0"))}
      </span>
      <span className="mr_1 hidden sm:inline">মিনিট</span>
      <span className="mr-1 sm:hidden">মি</span>
      <span className="tabular-nums">
        {toBengaliNumber(String(timeLeft.seconds).padStart(2, "0"))}
      </span>
      <span className="hidden sm:inline">সেকেন্ড</span>
      <span className="sm:hidden">সে</span>
    </TableCell>
  );
};

const departmentInfo: {
  [key: string]: { color: string; label: string };
} = {
  science: { color: "#22c55e", label: "বিজ্ঞান" }, // bg-green-500
  arts: { color: "#3b82f6", label: "মানবিক" }, // bg-blue-500
  commerce: { color: "#eab308", label: "ব্যবসা" }, // bg-yellow-500
  mixed: { color: "#6b7280", label: "মিক্সড" }, // bg-gray-500
};

const ArrowTag = ({
  color,
  label,
  className,
}: {
  color: string;
  label: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative whitespace-nowrap", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0 0 H80 L100 50 L80 100 H0 Z" fill={color} />
      </svg>
      <div className="relative z-10 flex items-center justify-center text-white font-bold h-full px-4 pr-6">
        {label}
      </div>
    </div>
  );
};

const CalendarAdmissionScheduleTable = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("admissionFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem("admissionFavorites", JSON.stringify(newFavorites));
    toast({
      title: newFavorites.includes(id)
        ? "পছন্দের তালিকায় যুক্ত হয়েছে"
        : "পছন্দের তালিকা থেকে সরানো হয়েছে",
    });
  };

  const admissionSchedule = allData.CalendarInfo.filter((item) => {
    const { date, ExamCountdownDate } = item.examDetails;
    return date !== null || ExamCountdownDate !== null;
  }).sort((a, b) => {
    const isAFav = favorites.includes(a.id);
    const isBFav = favorites.includes(b.id);

    if (isAFav && !isBFav) return -1;
    if (!isAFav && isBFav) return 1;

    const dateA = a.examDetails.ExamCountdownDate
      ? new Date(a.examDetails.ExamCountdownDate).getTime()
      : 0;
    const dateB = b.examDetails.ExamCountdownDate
      ? new Date(b.examDetails.ExamCountdownDate).getTime()
      : 0;

    const now = new Date().getTime();
    const completedA = dateA > 0 && dateA < now;
    const completedB = dateB > 0 && dateB < now;

    if (completedA && !completedB) return 1;
    if (!completedA && completedB) return -1;
    if (completedA && completedB) return dateA - dateB;

    if (dateA === 0) return 1;
    if (dateB === 0) return -1;

    return dateA - dateB;
  });

  return (
    <div className="mt-4 w-full border border-border bg-card rounded-2xl shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-primary text-primary-foreground text-center font-bold rounded-tl-2xl w-[5%]"></TableHead>
            <TableHead className="bg-primary text-primary-foreground p-0 w-[10px]"></TableHead>
            <TableHead className="bg-primary text-primary-foreground text-center font-bold">
              ভার্সিটি
            </TableHead>
            <TableHead className="bg-primary text-primary-foreground text-center font-bold truncate">
              তারিখ
            </TableHead>
            <TableHead className="bg-primary text-primary-foreground text-center font-bold rounded-tr-2xl">
              সময় বাকি
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admissionSchedule.map((item: any) => {
            const deptInfo =
              departmentInfo[item.department] || departmentInfo.mixed;
            return (
              <TableRow
                key={item.id}
                className={cn(
                  "even:bg-muted/50",
                  favorites.includes(item.id) &&
                    "bg-primary/10 dark:bg-primary/20",
                )}
              >
                <TableCell className="align-top text-center">
                  <Heart
                    className={cn(
                      "h-5 w-5 cursor-pointer text-muted-foreground/30 transition-all hover:scale-125",
                      favorites.includes(item.id) &&
                        "text-primary fill-primary",
                    )}
                    onClick={() => toggleFavorite(item.id)}
                  />
                </TableCell>
                <TableCell className="align-middle p-0 group relative">
                  <div
                    className="w-2 h-full absolute top-0 left-0 rounded-r-full group-hover:rounded-r-none transition-all duration-300"
                    style={{ backgroundColor: deptInfo.color }}
                  ></div>
                  <ArrowTag
                    color={deptInfo.color}
                    label={deptInfo.label}
                    className="absolute left-2 top-0 bottom-0 text-white font-bold opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none -translate-x-full group-hover:translate-x-0 z-10"
                  />
                </TableCell>
                <TableCell className="text-center font-bold whitespace-nowrap align-top truncate">
                  {item.universityNameAndUnit}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap align-top truncate">
                  {item.examDetails.date}
                </TableCell>
                <CountdownCell
                  targetDate={item.examDetails.ExamCountdownDate}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CalendarAdmissionScheduleTable;
