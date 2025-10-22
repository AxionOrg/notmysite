"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { University } from "@/lib/supabase/database.types";
import FloatingMenu from "@/components/common/FloatingMenu";
import LinkList from "@/components/common/LinkList";
import Circular from "@/components/common/Circular";
import PageHeaderCard from "./common/PageHeaderCard";
import Image from "next/image";

const CountdownTimer = dynamic(
  () => import("@/components/common/CountdownTimer"),
  { ssr: false },
);

const LoadingComponent = () => (
  <div className="text-center p-8">লোড হচ্ছে...</div>
);

const DhakaQuestionBank = dynamic(() => import("./DhakaQuestionBank"), {
  loading: LoadingComponent,
});
const DhakaAdmissionInfo = dynamic(() => import("./DhakaAdmissionInfo"), {
  loading: LoadingComponent,
});
const DhakaSeatInfo = dynamic(() => import("./DhakaSeatInfo"), {
  loading: LoadingComponent,
});
const DhakaHistoryAndMap = dynamic(() => import("./DhakaHistoryAndMap"), {
  loading: LoadingComponent,
});

const GstQuestionBank = dynamic(() => import("./GstQuestionBank"), {
  loading: LoadingComponent,
});
const GstAdmissionInfo = dynamic(() => import("./GstAdmissionInfo"), {
  loading: LoadingComponent,
});
const GstSeatInfo = dynamic(() => import("./GstSeatInfo"), {
  loading: LoadingComponent,
});
const SharedHistoryAndMap = dynamic(() => import("./SharedHistoryAndMap"), {
  loading: LoadingComponent,
});

const AgriQuestionBank = dynamic(() => import("./AgriQuestionBank"), {
  loading: LoadingComponent,
});
const AgriAdmissionInfo = dynamic(() => import("./AgriAdmissionInfo"), {
  loading: LoadingComponent,
});
const AgriSeatInfo = dynamic(() => import("./AgriSeatInfo"), {
  loading: LoadingComponent,
});

const SharedQuestionBank = dynamic(() => import("./SharedQuestionBank"), {
  loading: LoadingComponent,
});

const SharedAdmissionInfo = dynamic(() => import("./SharedAdmissionInfo"), {
  loading: LoadingComponent,
});

const MISTSeatInfo = dynamic(() => import("./MISTSeatInfo"), {
  loading: LoadingComponent,
});

// Define a more specific type for the components
interface UniversityComponentSet {
  QuestionBank: React.ComponentType<any>;
  AdmissionInfo: React.ComponentType<any>;
  SeatInfo: React.ComponentType<{ universityData: any }>; // Make it specific if possible
  HistoryAndMap: React.ComponentType<{ university: University }>;
}

// Component Map for university-specific components
const universityComponents: {
  [key: string]: Partial<UniversityComponentSet>;
} = {
  du: {
    QuestionBank: DhakaQuestionBank,
    AdmissionInfo: DhakaAdmissionInfo,
    SeatInfo: DhakaSeatInfo,
    HistoryAndMap: DhakaHistoryAndMap,
  },
  ru: {
    QuestionBank: DhakaQuestionBank,
    AdmissionInfo: DhakaAdmissionInfo,
    SeatInfo: DhakaSeatInfo,
    HistoryAndMap: DhakaHistoryAndMap,
  },
  gst: {
    QuestionBank: GstQuestionBank,
    AdmissionInfo: GstAdmissionInfo,
    SeatInfo: GstSeatInfo,
    HistoryAndMap: SharedHistoryAndMap,
  },
  agri: {
    QuestionBank: AgriQuestionBank,
    AdmissionInfo: AgriAdmissionInfo,
    SeatInfo: AgriSeatInfo,
    HistoryAndMap: SharedHistoryAndMap,
  },
  mist: {
    HistoryAndMap: SharedHistoryAndMap,
    QuestionBank: SharedQuestionBank,
    AdmissionInfo: SharedAdmissionInfo,
    SeatInfo: MISTSeatInfo,
  },
};

interface UniversityData extends University {
  links: any[];
  stats: {
    value: string;
    label: string;
    tooltip?: string;
  }[];
  circular?: {
    title: string;
    note?: string;
    downloadLink: string;
  };
  previousCirculars?: { href: string; text: string }[];
}
interface UniversityPageProps {
  university: University;
  universityData: UniversityData;
}

const UniversityPage = ({
  university,
  universityData,
}: UniversityPageProps) => {
  const SpecificComponents = universityComponents[university.id];

  // Default circular data for non-agri pages
  const circularData = universityData.circular || {
    title: "সম্পূর্ণ সার্কুলার",
    note: "(⚠ নোট: সর্বশেষ সার্কুলার এখনও প্রকাশিত হয়নি। পূর্ববর্তী বছরের সার্কুলার দেখে আইডিয়া নিতে পারেন।)",
    downloadLink: "https://t.me/Study_on_Telegram/14079",
  };

  const previousCircularsData = universityData.previousCirculars;

  return (
    <div className="bg-background">
      <FloatingMenu />

      <div className="container mx-auto px-2 lg:px-44">
        {university.category && university.category.length > 0 && (
          <div className="text-xs sm:text-sm text-foreground absolute top-[86px] sm:top-[91px] sm:left-[30px] left-6 bg-card border border-border rounded-[8px] px-3 py-1 z-20 lg:left-[190px]">
            <b>{university.category.join(", ")}</b>
          </div>
        )}

        {/* 1. মূল তথ্য */}
        <PageHeaderCard
          icon={
            <Image
              src={university.logo}
              alt={`${university.nameEn} Logo`}
              width={100}
              height={100}
              className="p-1 w-full h-full object-contain rounded-2xl"
            />
          }
          title={university.nameBn}
          subtitle={university.nameEn}
          description={university.description}
          stats={universityData.stats || []}
          button={{ href: "#Info", label: "মূল তথ্য" }}
        />

        {universityData.links && universityData.links.length > 0 && (
          <LinkList links={universityData.links} />
        )}
        
        {/* 2. ইতিহাস ও ম্যাপ */}
        {SpecificComponents?.HistoryAndMap && (
          <SpecificComponents.HistoryAndMap university={university} />
        )}

        {/* 3. কাউন্টডাউন */}
        <div className="mt-4 w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg relative">
          <CountdownTimer universityId={university.id} />
        </div>
        
        {/* 4. সার্কুলার */}
        <Circular
          title={circularData.title}
          note={circularData.note}
          downloadLink={circularData.downloadLink}
          showPreviousYears={!!SpecificComponents || !!previousCircularsData}
          previousCirculars={previousCircularsData}
        />

        {SpecificComponents ? (
          <>
            {/* 5. প্রশ্নব্যাংক */}
            {SpecificComponents.QuestionBank && (
              <SpecificComponents.QuestionBank university={university} />
            )}

            {/* 6. ভর্তি তথ্য */}
            {SpecificComponents.AdmissionInfo && (
              <SpecificComponents.AdmissionInfo university={university} />
            )}

            {/* 7. আসন সংখ্যা */}
            {SpecificComponents.SeatInfo && (
              <SpecificComponents.SeatInfo universityData={universityData} />
            )}
          </>
        ) : (
          <div className="mt-8 text-center text-muted-foreground">
            এই বিশ্ববিদ্যালয়ের বিস্তারিত তথ্য শীঘ্রই যোগ করা হবে।
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityPage;
