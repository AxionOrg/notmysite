"use client";

import dynamic from "next/dynamic";
import SimplePageHeader from "@/components/common/SimplePageHeader";

const AdmissionTabs = dynamic(
  () => import("@/components/calendar/CalendarAdmissionTabs"),
  {
    ssr: false,
  },
);

function CalendarPage() {
  return (
    <div className="font-bengali bg-background">
      <div className="container mx-auto px-2 lg:px-[170px]">
        <div className="px-4">
          <SimplePageHeader
            title="অ্যাডমিশন ক্যালেন্ডার"
            description="সকল বিশ্ববিদ্যালয় ও অধিভুক্ত কলেজের ভর্তি পরীক্ষার সকল তথ্য একত্রে এক জায়গায়"
          />
        </div>

        <AdmissionTabs />
      </div>
    </div>
  );
}

export default CalendarPage;
