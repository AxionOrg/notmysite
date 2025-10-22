"use client";

import React from "react";
import { Accordion } from "@/components/ui/accordion";
import QuestionBankAccordion from "@/components/QuestionBankAccordion";
import { allData } from "@/lib/data/_generated";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define interfaces for question bank data structure
interface QuestionBankItem {
  title?: string;
  links: Array<{
    text: string;
    url: string;
  }>;
}

interface QuestionBankCategory {
  title: string;
  items: QuestionBankItem[];
}

interface DUQuestionBanks {
  duUnitA: QuestionBankCategory[];
  duUnitB: QuestionBankCategory[];
  duUnitC: QuestionBankCategory[];
  duUnitCha: QuestionBankCategory[];
  duIBA: QuestionBankCategory[];
}

const DhakaUniversityTab = () => {
  const duData = allData.universities.find((uni) => uni.id === "du");

  if (!duData || !duData.questionBanks) {
    return <div>ঢাকা বিশ্ববিদ্যালয়ের প্রশ্নব্যাংক পাওয়া যায়নি।</div>;
  }

  const questionBanks = duData.questionBanks as DUQuestionBanks;

  // Create safe arrays with fallbacks
  const safeDuUnitA = questionBanks.duUnitA || [];
  const safeDuUnitB = questionBanks.duUnitB || [];
  const safeDuUnitC = questionBanks.duUnitC || [];
  const safeDuUnitCha = questionBanks.duUnitCha || [];
  const safeDuIBA = questionBanks.duIBA || [];

  return (
    <Tabs defaultValue="ka-unit" className="w-full">
      <TabsList className="flex flex-wrap w-full h-auto bg-transparent gap-2">
        <TabsTrigger value="ka-unit" className="flex-grow">
          &quot;ক&quot; ইউনিট
        </TabsTrigger>
        <TabsTrigger value="kha-unit" className="flex-grow">
          &quot;খ&quot; ইউনিট
        </TabsTrigger>
        <TabsTrigger value="ga-unit" className="flex-grow">
          &quot;গ&quot; ইউনিট
        </TabsTrigger>
        <TabsTrigger value="cha-unit" className="flex-grow">
          &quot;চ&quot; ইউনিট
        </TabsTrigger>
        <TabsTrigger value="iba-unit" className="flex-grow">
          DU IBA (বিশেষ)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ka-unit">
        <Accordion type="multiple" className="w-full text-left space-y-2">
          {safeDuUnitA.map((item: QuestionBankCategory, index: number) => (
            <QuestionBankAccordion
              key={index}
              value={`item-${index}`}
              title={item.title}
              items={item.items}
            />
          ))}
        </Accordion>
      </TabsContent>
      <TabsContent value="kha-unit">
        <Accordion type="multiple" className="w-full text-left space-y-2">
          {safeDuUnitB.map((item: QuestionBankCategory, index: number) => (
            <QuestionBankAccordion
              key={index}
              value={`item-${index}`}
              title={item.title}
              items={item.items}
            />
          ))}
        </Accordion>
      </TabsContent>
      <TabsContent value="ga-unit">
        <Accordion type="multiple" className="w-full text-left space-y-2">
          {safeDuUnitC.map((item: QuestionBankCategory, index: number) => (
            <QuestionBankAccordion
              key={index}
              value={`item-${index}`}
              title={item.title}
              items={item.items}
            />
          ))}
        </Accordion>
      </TabsContent>
      <TabsContent value="cha-unit">
        <Accordion type="multiple" className="w-full text-left space-y-2">
          {safeDuUnitCha.map((item: QuestionBankCategory, index: number) => (
            <QuestionBankAccordion
              key={index}
              value={`item-${index}`}
              title={item.title}
              items={item.items}
            />
          ))}
        </Accordion>
      </TabsContent>
      <TabsContent value="iba-unit">
        <Accordion type="multiple" className="w-full text-left space-y-2">
          {safeDuIBA.map((item: QuestionBankCategory, index: number) => (
            <QuestionBankAccordion
              key={index}
              value={`item-${index}`}
              title={item.title}
              items={item.items}
            />
          ))}
        </Accordion>
      </TabsContent>
    </Tabs>
  );
};

export default DhakaUniversityTab;
