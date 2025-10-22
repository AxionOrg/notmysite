"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SimplePageHeader from "@/components/common/SimplePageHeader";
import { Construction } from "lucide-react";

function CoursesPage() {
  return (
    <div className="font-bengali bg-background">
      <div className="container mx-auto px-2">
        <div className="px-4">
          <SimplePageHeader
            title="আমাদের কোর্সসমূহ"
            description="তোমার স্বপ্ন পূরণের যাত্রায় আমরা আছি পাশে। দেশের সেরা শিক্ষকদের তত্ত্বাবধানে প্রস্তুতি নাও আরও মজবুত ও কার্যকরভাবে।"
          />
        </div>

        <div className="mt-12 text-center bg-card border border-border rounded-2xl p-8 sm:p-12 shadow-lg animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <Construction className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            এই পেইজটি নিয়ে কাজ চলছে
          </h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            আমরা খুব শীঘ্রই নতুন কোর্স এবং কনটেন্ট নিয়ে আসছি। আমাদের সাথেই
            থাকুন!
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/">হোম পেইজে ফিরে যান</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
