"use client";
import { Accordion } from "@/components/ui/accordion";
import QuestionBankAccordion from "@/components/QuestionBankAccordion";
import { allData } from "@/lib/data/_generated";
import type { University } from "@/lib/supabase/database.types";

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

interface SharedQuestionBankProps {
  university: University;
}

const SharedQuestionBank = ({ university }: SharedQuestionBankProps) => {
  const uniData = allData.universities.find((uni) => uni.id === university.id);

  if (!uniData || !uniData.questionBanks) {
    return <div>এই বিশ্ববিদ্যালয়ের প্রশ্নব্যাংক পাওয়া যায়নি।</div>;
  }

  const questionBanks = (uniData.questionBanks as any).questionBank || [];

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
      <Accordion type="multiple" className="w-full text-left space-y-2">
        {questionBanks.map((item: QuestionBankCategory, index: number) => (
          <QuestionBankAccordion
            key={index}
            value={`item-${index}`}
            title={item.title}
            items={item.items}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default SharedQuestionBank;
