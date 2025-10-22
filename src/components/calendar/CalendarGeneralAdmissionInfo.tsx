"use client";
import { useState } from "react";
import PublicPageClient from "@/components/PublicPageClient";
import { allData } from "@/lib/data";
import type { University } from "@/lib/supabase/database.types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CalendarGeneralAdmissionInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const publicUniversities = allData.universities.filter(
    (uni: University) => !uni.category.includes("প্রাইভেট"),
  );

  const filteredUniversities = publicUniversities.filter((uni) => {
    if (searchTerm === "") return true;
    const lowercasedTerm = searchTerm.toLowerCase();
    return (
      uni.nameBn.toLowerCase().includes(lowercasedTerm) ||
      uni.nameEn.toLowerCase().includes(lowercasedTerm) ||
      uni.shortName.toLowerCase().includes(lowercasedTerm)
    );
  });

  return (
    <div id="Info" className="mt-4 w-full">
      <div className="mt-8 space-y-4 px-2 sm:px-0">
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
      <PublicPageClient universities={filteredUniversities} />
    </div>
  );
};

export default CalendarGeneralAdmissionInfo;
