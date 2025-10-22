"use client";

import { allData } from "@/lib/data/_generated";
import PublicPageClient from "@/components/PublicPageClient";

export default function PublicPage() {
  const publicUniversities = allData.universities.filter(
    (uni) => !uni.category.includes("প্রাইভেট"),
  );

  return (
    <div className="container mx-auto px-2">
      <PublicPageClient universities={publicUniversities} />
    </div>
  );
}
