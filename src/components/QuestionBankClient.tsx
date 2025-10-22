"use client";
import {
  University as UniversityIcon,
  Leaf,
  Cog,
  Atom,
  HeartPulse,
  Blocks,
  Sparkles,
  Building,
} from "lucide-react";
import type { University } from "@/lib/supabase/database.types";
import { Input } from "@/components/ui/input";
import QuestionBankUniversityCard from "./QuestionBankUniversityCard";

interface QuestionBankClientProps {
  universities: University[];
  searchTerm: string;
}

const categoryIcons: { [key: string]: React.FC<React.ComponentProps<"svg">> } =
  {
    গুচ্ছ: Blocks,
    সাধারণ: UniversityIcon,
    কৃষি: Leaf,
    প্রকৌশল: Cog,
    "বিজ্ঞান ও প্রযুক্তি": Atom,
    মেডিকেল: HeartPulse,
    বিশেষ: Sparkles,
    অধিভুক্ত: UniversityIcon,
    প্রাইভেট: Building,
  };

const categoryIdMap: { [key: string]: string } = {
  গুচ্ছ: "cluster-system",
  সাধারণ: "general",
  কৃষি: "agriculture",
  প্রকৌশল: "engineering",
  "বিজ্ঞান ও প্রযুক্তি": "science-and-technology",
  মেডিকেল: "medical",
  বিশেষ: "special",
  অধিভুক্ত: "affiliated",
  প্রাইভেট: "private",
};

export default function QuestionBankClient({
  universities,
  searchTerm,
}: QuestionBankClientProps) {
  const filteredUniversities = universities.filter((uni) => {
    if (searchTerm === "") return true;
    const lowercasedTerm = searchTerm.toLowerCase();
    return (
      uni.nameBn.toLowerCase().includes(lowercasedTerm) ||
      uni.nameEn.toLowerCase().includes(lowercasedTerm) ||
      uni.shortName.toLowerCase().includes(lowercasedTerm)
    );
  });

  const groupedUniversities = filteredUniversities.reduce(
    (acc, uni) => {
      uni.category.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(uni);
      });
      return acc;
    },
    {} as Record<string, University[]>,
  );

  const categoryOrder = [
    "গুচ্ছ",
    "সাধারণ",
    "কৃষি",
    "প্রকৌশল",
    "বিজ্ঞান ও প্রযুক্তি",
    "মেডিকেল",
    "বিশেষ",
    "অধিভুক্ত",
    "প্রাইভেট",
  ];

  const sortedCategories = Object.keys(groupedUniversities).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b),
  );

  return (
    <>
      <div className="mt-12 space-y-12">
        {sortedCategories.map((category) => {
          const Icon = categoryIcons[category];
          const categoryId = categoryIdMap[category];
          return (
            <div key={category}>
              <a
                href={`#${categoryId}`}
                id={categoryId}
                className="scroll-mt-24"
              >
                <div className="flex justify-center">
                  <div className="gradient-background inline-flex items-center gap-2 px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
                    {Icon && <Icon className="h-5 w-5" />}
                    {category}
                  </div>
                </div>
              </a>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {groupedUniversities[category].map((university, index) => (
                  <div
                    key={university.shortName}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <QuestionBankUniversityCard university={university} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
