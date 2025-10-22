"use client";
import DhakaUniversityTab from "@/components/DhakaUniversityTab";
import { BookOpen } from "lucide-react";

const DhakaQuestionBank = () => {
  return (
    <div
      id="QuestionBank"
      className="mt-4 w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg text-center relative animate-fade-in-up"
    >
      <div className="flex justify-center">
        <div className="gradient-background inline-block px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
          প্রশ্নব্যাংক
        </div>
      </div>
      <DhakaUniversityTab />
    </div>
  );
};

export default DhakaQuestionBank;
