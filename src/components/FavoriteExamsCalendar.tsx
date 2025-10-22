"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { allData } from "@/lib/data/_generated";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DayContentProps } from "react-day-picker";
import { bn } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const FavoriteExamsCalendar = () => {
  const [allExamDates, setAllExamDates] = useState<{
    [key: string]: string[];
  }>({});
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [modifiers, setModifiers] = useState({});
  const [month, setMonth] = useState<Date>(new Date());

  useEffect(() => {
    const storedFavorites = localStorage.getItem("admissionFavorites");
    if (storedFavorites) {
      setFavoriteIds(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const dates: { [key: string]: string[] } = {};
    const allEvents = allData.CalendarInfo.filter(
      (item) => item.examDetails.ExamCountdownDate,
    ).map((item) => ({
      id: item.id,
      date: new Date(item.examDetails.ExamCountdownDate!),
      title: item.universityNameAndUnit,
    }));

    allEvents.forEach((event) => {
      if (!isNaN(event.date.getTime())) {
        const dateString = format(event.date, "yyyy-MM-dd");
        if (!dates[dateString]) {
          dates[dateString] = [];
        }
        dates[dateString].push(event.title);
      }
    });

    setAllExamDates(dates);

    const favoriteDates = allEvents
      .filter((event) => favoriteIds.includes(event.id))
      .map((event) => event.date);

    const otherDates = allEvents
      .filter((event) => !favoriteIds.includes(event.id))
      .map((event) => event.date);

    setModifiers({
      favorite: favoriteDates,
      other: otherDates,
    });

    const firstDateToShow =
      favoriteDates.length > 0
        ? favoriteDates[0]
        : allEvents.find((e) => e.date > new Date())?.date ||
          allEvents[0]?.date;
    if (firstDateToShow && !isNaN(firstDateToShow.getTime())) {
      setMonth(firstDateToShow);
    }
  }, [favoriteIds]);

  const DayWithTooltip = (props: DayContentProps) => {
    const day = props.date;
    if (isNaN(day.getTime())) {
      return <div />;
    }
    const dateString = format(day, "yyyy-MM-dd");
    const titles = allExamDates[dateString];

    const isFavorite = (modifiers as any).favorite?.some(
      (d: Date) => d.toDateString() === day.toDateString(),
    );
    const isOther = (modifiers as any).other?.some(
      (d: Date) => d.toDateString() === day.toDateString(),
    );

    if (titles && (isFavorite || isOther)) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "relative flex flex-col h-full w-full items-center justify-center rounded-md",
                  isFavorite && "bg-primary/20",
                  isOther && "bg-accent",
                )}
              >
                <span>{format(day, "d", { locale: bn })}</span>
                {titles.length === 1 ? (
                  <span className="text-[8px] leading-tight truncate w-full px-1 absolute bottom-1">
                    {titles[0]}
                  </span>
                ) : (
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full absolute bottom-1.5",
                      isFavorite ? "bg-primary" : "bg-muted-foreground",
                    )}
                  ></span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="font-bengali text-sm">
                {titles.map((title, i) => (
                  <p key={i}>{title}</p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return <div>{format(day, "d", { locale: bn })}</div>;
  };

  return (
    <Calendar
      locale={bn}
      mode="single"
      month={month}
      onMonthChange={setMonth}
      numberOfMonths={1}
      modifiers={modifiers}
      modifiersClassNames={{
        favorite: "", // Style is applied in DayWithTooltip
        other: "", // Style is applied in DayWithTooltip
      }}
      components={{
        DayContent: DayWithTooltip,
      }}
      className="p-0 flex justify-center"
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        cell: "h-10 w-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: "h-10 w-10 p-0",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-normal text-[0.8rem]",
        day_selected: "bg-primary text-primary-foreground",
        day_today: "ring-2 ring-primary rounded-md",
      }}
    />
  );
};

export default FavoriteExamsCalendar;
