"use client";

import React, { useState } from "react";
import SimplePageHeader from "@/components/common/SimplePageHeader";
import QuestionBankCards from "@/components/QuestionBankCards";
import { Input } from "@/components/ui/input";
import { Search, Book, Pen, Folder } from "lucide-react";
import PublicPageFloatingMenu from "@/components/common/PublicPageFloatingMenu";
import QuestionBankClient from "@/components/QuestionBankClient";
import TestPaperCard from "@/components/TestPaperCards";
import { allData } from "@/lib/data/_generated";

export default function QuestionBankPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const allGroupsTestPapers = allData.testPapersList.allGroups;
  const scienceGroupTestPapers = allData.testPapersList.scienceGroup;
  const allUniversities = allData.universities;
  const publicUniversities = allUniversities.filter(
    (uni) => !uni.category.includes("প্রাইভেট"),
  );
  const privateUniversities = allUniversities.filter((uni) =>
    uni.category.includes("প্রাইভেট"),
  );

  return (
    <div className="font-bengali bg-background">
      <PublicPageFloatingMenu />
      <div className="container mx-auto px-2">
        <div className="px-4">
          <SimplePageHeader
            title="প্রশ্নব্যাংক ও সমাধান"
            description="বিগত বছরের প্রশ্ন সমাধান করে ভর্তি প্রস্তুতিতে এগিয়ে থাকো। এখানেই পাবে সব বিশ্ববিদ্যালয় ও ইউনিটের প্রশ্নব্যাংক।"
          />
        </div>

        <div className="mt-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="বিশ্ববিদ্যালয় খুঁজুন..."
              className="w-full pl-10 h-12 text-base bg-card"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-12">
          <h2
            id="master-question-bank"
            className="text-2xl font-bold mb-4 text-center pb-2 border-b-2 border-primary/20 flex items-center justify-center gap-2"
          >
            <Book className="h-6 w-6 text-primary/80" />
            প্রশ্নব্যাংক সমগ্র
          </h2>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="gradient-background inline-flex items-center gap-2 px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
            <Book className="h-5 w-5" />
            মাস্টার প্রশ্নব্যাংক
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <QuestionBankCards />
        </div>

        <div className="mt-12">
          <QuestionBankClient
            universities={[...publicUniversities, ...privateUniversities]}
            searchTerm={searchTerm}
          />
        </div>

        <div className="mt-12">
          <h2
            id="test-papers"
            className="text-2xl font-bold mb-4 text-center pb-2 border-b-2 border-primary/20 flex items-center justify-center gap-2"
          >
            <Pen className="h-6 w-6 text-primary/80" />
            টেস্ট পেপার (HSC)
          </h2>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="gradient-background inline-flex items-center gap-2 px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
            <Folder className="h-5 w-5" />
            সকল বিভাগ
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allGroupsTestPapers.map((paper, index) => (
            <TestPaperCard key={index} {...paper} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="gradient-background inline-flex items-center gap-2 px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
            <Folder className="h-5 w-5" />
            বিজ্ঞান বিভাগ
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {scienceGroupTestPapers.map((paper, index) => (
            <TestPaperCard key={index} {...paper} />
          ))}
        </div>
      </div>
    </div>
  );
}
