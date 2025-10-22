"use client";

import React, { useState, useEffect, useRef } from "react";
import { allData } from "@/lib/data/_generated";

interface Deadline {
  id: string;
  title: string;
  date: Date;
  universityId?: string;
  type: "exam" | "apply" | "admit";
}

const admissionDeadlines: Deadline[] = allData.CalendarInfo.flatMap((item) => {
  const deadlines: Deadline[] = [];
  const universityId = item.id.split("-")[0];

  if (item.examDetails.ExamCountdownDate) {
    deadlines.push({
      id: `${item.id}-exam`,
      title: `🎓 ${item.universityNameAndUnit} পরীক্ষার কাউন্টডাউন`,
      date: new Date(item.examDetails.ExamCountdownDate),
      universityId,
      type: "exam",
    });
  }
  if (item.applicationDetails.ApplyCountdownDate) {
    deadlines.push({
      id: `${item.id}-apply`,
      title: `✍️ ${item.universityNameAndUnit} আবেদনের শেষ সময়`,
      date: new Date(item.applicationDetails.ApplyCountdownDate),
      universityId,
      type: "apply",
    });
  }
  if (item.admitCardDetails.DownloadCountdownDate) {
    deadlines.push({
      id: `${item.id}-admit`,
      title: `🎟️ ${item.universityNameAndUnit} প্রবেশপত্র ডাউনলোডের শেষ সময়`,
      date: new Date(item.admitCardDetails.DownloadCountdownDate),
      universityId,
      type: "admit",
    });
  }
  return deadlines;
});

function getDeadlinesByUniversity(
  universityId: string,
): Deadline[] | undefined {
  if (universityId === "gst") {
    const gstIds = ["gst", "gst-a", "gst-b", "gst-c"];
    const deadlines = admissionDeadlines.filter(
      (d) =>
        (d.universityId && gstIds.includes(d.universityId)) ||
        gstIds.includes(d.id),
    );
    return deadlines.length > 0 ? deadlines : undefined;
  }
  const deadlines = admissionDeadlines.filter(
    (d) => d.universityId === universityId,
  );
  return deadlines.length > 0 ? deadlines : undefined;
}

interface CountdownTimerProps {
  universityId?: string;
}

const CountdownTimer = ({ universityId }: CountdownTimerProps) => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [timeLeft, setTimeLeft] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });
  const [isCurrentCompleted, setIsCurrentCompleted] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    let relevantDeadlines: Deadline[];
    if (universityId) {
      relevantDeadlines = getDeadlinesByUniversity(universityId) || [];
    } else {
      relevantDeadlines = admissionDeadlines;
    }

    const typePriority = { apply: 1, admit: 2, exam: 3 };

    const sortedDeadlines = relevantDeadlines
      .filter((d) => d.date > new Date())
      .sort((a, b) => {
        const dateA = a.date.getTime();
        const dateB = b.date.getTime();
        if (dateA !== dateB) {
          return dateA - dateB;
        }
        return typePriority[a.type] - typePriority[b.type];
      });

    setDeadlines(relevantDeadlines); // Keep original for finding by ID

    if (sortedDeadlines.length > 0) {
      const firstUpcomingId = sortedDeadlines[0].id;
      const firstUpcomingIndex = relevantDeadlines.findIndex(
        (d) => d.id === firstUpcomingId,
      );
      setCurrentIndex(firstUpcomingIndex);
    } else if (relevantDeadlines.length > 0) {
      // If no upcoming, show the last chronological one
      const lastDeadline = [...relevantDeadlines].sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      )[0];
      const lastIndex = relevantDeadlines.findIndex(
        (d) => d.id === lastDeadline.id,
      );
      setCurrentIndex(lastIndex);
      setIsCurrentCompleted(true);
      setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
    } else {
      setCurrentIndex(-1);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [universityId]);

  useEffect(() => {
    const updateTimer = () => {
      if (currentIndex < 0 || isCurrentCompleted || deadlines.length === 0)
        return;

      const now = new Date();
      const difference = deadlines[currentIndex].date.getTime() - now.getTime();

      if (difference <= 0) {
        setIsCurrentCompleted(true);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        setTimeout(() => {
          // This logic can be refined to find the next upcoming one
          setCurrentIndex((prev) => (prev + 1) % deadlines.length);
          setIsCurrentCompleted(false);
        }, 2000);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
        animationFrameId.current = requestAnimationFrame(updateTimer);
      }
    };

    if (!isCurrentCompleted) {
      animationFrameId.current = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [currentIndex, isCurrentCompleted, deadlines]);

  const currentDeadline =
    currentIndex >= 0 && currentIndex < deadlines.length
      ? deadlines[currentIndex]
      : null;

  if (deadlines.length === 0 && !universityId) {
    return (
      <div className="text-center font-bold text-lg p-4 bg-card rounded-2xl">
        সকল ভর্তি পরীক্ষার সময়সীমা শেষ হয়েছে। নতুন সময়সূচী শীঘ্রই যুক্ত করা হবে।
      </div>
    );
  }

  if (!currentDeadline) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        এখন অব্দি কোনো তারিখ প্রকাশ করেনি
      </div>
    );
  }

  const TimeCircle = ({
    unit,
    value,
    max,
  }: {
    unit: string;
    value: string;
    max: number;
  }) => {
    const numValue = parseInt(value, 10);
    const progress = isNaN(numValue) ? 1 : 1 - numValue / max;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference * progress;

    return (
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-muted/50 dark:text-muted/20"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            key={unit === "সেকেন্ড" ? undefined : value}
            className="text-primary"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{
              strokeDashoffset: isCurrentCompleted ? 0 : offset,
              transition:
                unit === "সেকেন্ড" ? "none" : "stroke-dashoffset 0.5s ease-out",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            {value}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">{unit}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-center p-2 sm:p-4 rounded-2xl bg-card">
      <div className="text-lg font-bold mb-3 text-foreground">
        {currentDeadline.title}
        <div className="font-normal text-sm mt-1 text-muted-foreground">
          {currentDeadline.date.toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      {isCurrentCompleted ? (
        <div className="text-xl text-destructive font-bold mt-2.5">
          সময় শেষ!
        </div>
      ) : (
        <div className="flex gap-2 sm:gap-4 justify-center flex-nowrap">
          <TimeCircle unit="দিন" value={timeLeft.days} max={365} />
          <TimeCircle unit="ঘন্টা" value={timeLeft.hours} max={24} />
          <TimeCircle unit="মিনিট" value={timeLeft.minutes} max={60} />
          <TimeCircle unit="সেকেন্ড" value={timeLeft.seconds} max={60} />
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
