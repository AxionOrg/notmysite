"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Info,
  FilePenLine,
  Banknote,
  CircleCheck,
  Link as LinkIcon,
  CircleAlert,
  Dock,
  Timer,
  MapPinned,
  BarChart3,
  Users,
  CalendarClock,
  PackageCheck,
  Play,
  ListChecks,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { allData } from "@/lib/data/_generated";
import ExternalLink from "./common/ExternalLink";

// Define proper TypeScript interfaces
interface Fee {
  unit: string;
  amount: string;
}

interface HelpfulLink {
  label: string;
  url: string;
}

interface UnitDepartment {
  name: string;
  requirement: string;
}

interface UnitRequirement {
  name: string;
  departments: UnitDepartment[];
}

interface ExamDate {
  unit: string;
  date: string;
}

interface GeneralInfoPoint {
  label: string;
  value: string;
}

interface AdmissionInfoData {
  title: string;
  apply: {
    title: string;
    startDate: string;
    endDate: string;
    fees: Fee[];
    helpfulLinks: HelpfulLink[];
    link: string;
    qualificationTitle: string;
    sscBatch: string;
    hscBatch: string;
    secondTime: string;
  };
  unitRequirements: {
    title: string;
    units: UnitRequirement[];
  };
  improvementPolicy: {
    title: string;
    details: string;
  };
  admitCard: {
    title: string;
    startDate: string;
    endDate: string;
    link: string;
    note: string;
  };
  examDate: {
    title: string;
    dates: ExamDate[];
    note: {
      text: string;
      link: string;
    };
  };
  examCenter: {
    title: string;
    location: string;
    locationLink: string;
    note: string;
  };
  generalInfo: {
    points: GeneralInfoPoint[];
  };
  result: {
    title: string;
    date: string;
    link: string;
  };
}

const DhakaAdmissionInfo = () => {
  const duData = allData.universities.find((uni) => uni.id === "du");
  // Add type guard and safe destructuring
  if (!duData || !duData.admissionInfo) {
    return <div>No admission information available</div>;
  }

  const admissionInfo = duData.admissionInfo as AdmissionInfoData;

  const {
    apply,
    unitRequirements,
    improvementPolicy,
    admitCard,
    examDate,
    examCenter,
    generalInfo,
    result,
  } = admissionInfo;

  return (
    <div
      id="Info"
      className="mt-4 w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg relative text-left"
    >
      <div className="flex justify-center">
        <div className="gradient-background inline-block px-6 py-2 text-primary-foreground rounded-full text-base sm:text-lg mb-4 font-bold shadow-md">
          {admissionInfo.title}
        </div>
      </div>

      <h2
        id="Apply"
        className="bg-primary/10 text-primary rounded-xl p-3 mt-4 mb-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <FilePenLine size={16} className="mr-2" /> {apply.title}
      </h2>
      <div className="text-base">
        <div className="mt-2">
          <b>
            <CalendarClock className="inline-block mr-2" />
            আবেদনের সময়কাল:
          </b>
          <br />
          &nbsp;&nbsp;&nbsp;<b>• শুরু:</b> {apply.startDate}
          <br />
          &nbsp;&nbsp;&nbsp;<b>• শেষ:</b> {apply.endDate}
        </div>
        <br />
        <div className="mt-2">
          <b>
            <Banknote className="inline-block mr-2" />
            আবেদন ফিঃ (পূর্ববর্তী অনুসারে)
          </b>
          <br />
          {apply.fees.map((fee: Fee, index: number) => (
            <div key={index}>
              &nbsp;&nbsp;&nbsp; ✓ {fee.unit}: {fee.amount}
            </div>
          ))}
        </div>
        <br />
        <div className="flex items-center gap-2 flex-wrap">
          <CircleCheck
            className="text-green-600 dark:text-green-500"
            size={18}
          />
          {apply.helpfulLinks.map((link: HelpfulLink, index: number) => (
            <React.Fragment key={index}>
              <ExternalLink
                href={link.url}
                text={link.label}
                showIcon={false}
              />
              {index < apply.helpfulLinks.length - 1 && " | "}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="text-base">
        <b>
          <LinkIcon className="inline-block mr-2" size={18} />
          লিংকঃ
        </b>{" "}
        <ExternalLink
          href={apply.link}
          text={apply.link.replace("https://", "")}
        />
        <br />
        <br />
        <b>
          <PackageCheck className="inline-block mr-2" size={24} />
          {apply.qualificationTitle}
        </b>
        <br />
        &nbsp;&nbsp;&nbsp; <b>- SSC ব্যাচ:</b> {apply.sscBatch}
        <br />
        &nbsp;&nbsp;&nbsp; <b>- HSC ব্যাচ:</b> {apply.hscBatch}
        <br />
        <div className="text-red-500 dark:text-red-400 flex items-center">
          <CircleAlert size={18} className="inline-block mr-1" />{" "}
          <b>সেকেন্ড টাইম:</b>&nbsp;{apply.secondTime}
        </div>
      </div>
      <hr className="my-3 border-border/50" />

      <Accordion type="multiple" className="w-full space-y-2">
        <AccordionItem
          value="info-1"
          className="border border-border rounded-lg bg-card hover:bg-accent/50"
        >
          <AccordionTrigger className="p-3 text-base font-bold hover:no-underline">
            <div className="flex items-center">
              <CircleAlert className="inline-block mr-2" />
              <span>{unitRequirements.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0 sm:p-5 text-base">
            {unitRequirements.units.map(
              (unit: UnitRequirement, index: number) => (
                <div key={index} className="mb-2">
                  ❐ <b>&quot;{unit.name}&quot; ইউনিট:</b>
                  <br />
                  {unit.departments.map((dept: UnitDepartment, i: number) => (
                    <span key={i}>
                      ● <b>{dept.name}:</b> {dept.requirement}
                      <br />
                    </span>
                  ))}
                </div>
              ),
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="bg-card border border-border rounded-lg overflow-hidden mt-4"
        >
          <AccordionTrigger className="p-3 text-base font-bold hover:no-underline">
            <div className="flex items-center">
              <Info className="mr-2" />
              <span>{improvementPolicy.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0 sm:p-5 text-base">
            <span
              dangerouslySetInnerHTML={{ __html: improvementPolicy.details }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <h2
        id="AdmitCard"
        className="bg-primary/10 text-primary rounded-xl p-3 mt-8 mb-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <Dock className="mr-2" size={16} /> {admitCard.title}
      </h2>
      <div className="text-base">
        <div className="mt-2">
          <b>
            <CalendarClock className="inline-block mr-2" />
            ডাউনলোডের সময়কাল:
          </b>
          <br />
          <b>&nbsp;&nbsp;&nbsp; • শুরু:</b> {admitCard.startDate}
          <br />
          <b>&nbsp;&nbsp;&nbsp; • শেষ:</b> {admitCard.endDate}
          <br />
          <br />
          <b>
            <LinkIcon className="inline-block mr-2" size={18} />
            লিংকঃ
          </b>{" "}
          <ExternalLink
            href={admitCard.link}
            text={admitCard.link.replace("https://", "")}
          />
          <br />
          (লগইন করে ডাউনলোড করতে হবে।)
          <br />
          <br />
          <b>
            <div className="text-orange-500 dark:text-orange-400 flex items-center">
              <CircleAlert size={18} className="inline-block mr-1" />
              নোটঃ
            </div>
          </b>
          {admitCard.note}
        </div>
      </div>

      <h2
        id="ExamDate"
        className="bg-primary/10 text-primary rounded-xl p-3 mt-8 mb-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <Timer className="mr-2" size={16} /> {examDate.title}
      </h2>
      <span className="text-base">
        {examDate.dates.map((date: ExamDate, index: number) => (
          <span key={index}>
            ❐ <b>&quot;{date.unit}&quot; ইউনিট:</b> {date.date} <br />
          </span>
        ))}
      </span>
      <hr className="my-3 border-border/50" />
      <div className="border border-border/80 p-3 text-center rounded-md">
        সব বিশ্ববিদ্যালয়ের <b>পরীক্ষার তারিখ ও কাউন্টডাউন</b> জানতে ভিজিট করুন
        আমাদের{" "}
        <b>
          <ExternalLink href={examDate.note.link} text={examDate.note.text} />
        </b>
      </div>

      <h2
        id="Location"
        className="bg-primary/10 text-primary rounded-xl p-3 mt-8 mb-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <MapPinned className="mr-2" size={16} /> {examCenter.title}
      </h2>
      <span className="text-base">
        ➜ {examCenter.location}{" "}
        <ExternalLink href={examCenter.locationLink} text="[তালিকা]" /> <br />
        <hr className="my-2 border-border/50" />
        <b>
          <div className="text-orange-500 dark:text-orange-400 flex items-center">
            <CircleAlert size={18} className="inline-block mr-1" />
            নোটঃ
          </div>
        </b>
        {examCenter.note}
      </span>

      <div id="MarkDistributionAndOthers"></div>
      <h2 className="bg-primary/10 text-primary rounded-xl p-3 mt-8 mb-4 text-center text-lg font-bold flex items-center justify-center">
        <ListChecks className="mr-2" size={16} /> মানবণ্টন ও অন্যান্য তথ্য
      </h2>

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
          <div className="border border-border rounded-xl p-4 mt-2.5 text-base leading-relaxed">
            ● <b>মোট নাম্বার:</b> ১০০ নাম্বার
            <hr className="my-1 border-border/50" />● <b>MCQ:</b> ৬০,{" "}
            <b>লিখিত:</b> ৪০
            <hr className="my-1 border-border/50" />● <b>মোট সময়:</b> ১.৫ ঘণ্টা
            <hr className="my-1 border-border/50" />●{" "}
            <b>প্রতিটি বিষয়ের প্রশ্ন সংখ্যা ও নাম্বার:</b>
            <br />
            &nbsp;&nbsp;&nbsp; ✓ <b>MCQ -</b> প্রশ্ন: ১৫টি, নাম্বার: ১৫
            <hr className="my-1 border-border/50" />
            &nbsp;&nbsp;&nbsp; ✓ <b>লিখিত -</b> প্রশ্ন: ৪টি, নাম্বার: ১০
          </div>
          <Accordion type="multiple" className="w-full space-y-2 mt-2">
            <AccordionItem
              value="item-1-1"
              className="border border-border rounded-lg bg-card hover:bg-accent/50"
            >
              <AccordionTrigger className="p-3 text-base hover:no-underline">
                <div className="flex items-center">
                  <HelpCircle className="mr-2" />
                  <span>বিজ্ঞান বিভাগে কোন কোন বিষয় দাগাতে হবে?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-base">
                <b>=&gt; মোট ৪টি বিষয় দাগাতে হবে।</b>
                <br />
                <br />
                <b>✓ দাগানো বাধ্যতামূলক -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ পদার্থবিজ্ঞান
                <br />
                &nbsp;&nbsp;&nbsp; ○ রসায়ন
                <br />
                &nbsp;&nbsp;&nbsp; ○ মেইন সাবজেক্ট
                <br />
                <br />
                <b>✓ মেইন সাবজেক্ট মিলে একটা বা দুটোই -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ জীববিজ্ঞান
                <br />
                &nbsp;&nbsp;&nbsp; ○ উচ্চতর গণিত
                <br />
                <br />
                (মেইন সাবজেক্ট দাগানো বাধ্যতামূলক। না দাগালে রেজাল্ট আসবে না বা
                ফেল আসবে।)
                <br />
                <br />
                <b>✓ জীববিজ্ঞান বা উচ্চতর গণিত না দাগালে যেকোনো একটি –</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ বাংলা
                <br />
                &nbsp;&nbsp;&nbsp; ○ ইংরেজী
                <br />
                <br />
                <div className="flex items-center">
                  <Info size={14} className="mr-1" /> প্রতিটি বিষয়ের MCQ-15 ও
                  লিখিত-10
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-1-2"
              className="border border-border rounded-lg bg-card hover:bg-accent/50"
            >
              <AccordionTrigger className="p-3 text-base hover:no-underline">
                <div className="flex items-center">
                  <HelpCircle className="mr-2" />
                  <span>অন্য বিভাগে কোন কোন বিষয় দাগাতে হবে?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-base">
                <b>=&gt; মোট ৪টি বিষয় দাগাতে হবে।</b>
                <br />
                <br />
                <b>✓ দাগানো বাধ্যতামূলক -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ বাংলা
                <br />
                &nbsp;&nbsp;&nbsp; ○ ইংরেজী
                <br />
                &nbsp;&nbsp;&nbsp; ○ আইসিটি
                <br />
                <br />
                <b>✓ যেকোনো একটা -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ গণিত
                <br />
                &nbsp;&nbsp;&nbsp; ○ পরিসংখ্যান
                <br />
                &nbsp;&nbsp;&nbsp; ○ মনোবিজ্ঞান
                <br />
                &nbsp;&nbsp;&nbsp; ○ অর্থনীতি
                <br />
                &nbsp;&nbsp;&nbsp; ○ ভূগোল
                <br />
                <br />
                <div className="flex items-center">
                  <Info size={14} className="mr-1" /> প্রতিটি বিষয়ের MCQ-15 ও
                  লিখিত-10
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="kha-unit">
          <div className="border border-border rounded-xl p-4 mt-2.5 text-base leading-relaxed">
            ● <b>মোট নাম্বার:</b> ১০০ নাম্বার
            <hr className="my-1 border-border/50" />● <b>MCQ:</b> ৬০,{" "}
            <b>লিখিত:</b> ৪০
            <hr className="my-1 border-border/50" />● <b>মোট সময়:</b> ১.৫ ঘণ্টা
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-2 mt-2"
          >
            <AccordionItem
              value="item-2-1"
              className="border border-border rounded-lg bg-card hover:bg-accent/50"
            >
              <AccordionTrigger className="p-3 text-base hover:no-underline">
                <div className="flex items-center">
                  <HelpCircle className="mr-2" />
                  <span>মানবণ্টন ও কোন কোন বিষয় দাগাতে হবে?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-base">
                <b>=&gt; মোট ৩টি বিষয় দাগাতে হবে।</b>
                <br />
                <br />
                <b>✓ দাগানো বাধ্যতামূলক -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ➤ ইংরেজী
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>MCQ -</b> প্রশ্ন: ১৫টি,
                নাম্বার: ১৫
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>লিখিত -</b> প্রশ্ন: ৩টি,
                নাম্বার: ২০
                <br />
                &nbsp;&nbsp;&nbsp; ➤ সাধারণ জ্ঞান
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>MCQ -</b> প্রশ্ন: ৩০টি,
                নাম্বার: ৩০
                <br />
                <br />
                <b>✓ সাধারণ শিক্ষার্থীরা দাগাবে -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ➤ বাংলা
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>MCQ -</b> প্রশ্ন: ১৫টি,
                নাম্বার: ১৫
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>লিখিত -</b> প্রশ্ন: ৩টি,
                নাম্বার: ২০
                <br />
                <br />
                <b>✓ যারা GCE/A Level পাশ করেছে, তারাই শুধুমাত্র দাগাবে –</b>
                <br />
                &nbsp;&nbsp;&nbsp; ➤ Elective English
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>MCQ -</b> প্রশ্ন: ১৫টি,
                নাম্বার: ১৫
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>লিখিত -</b> প্রশ্ন: ৩টি,
                নাম্বার: ২০
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="ga-unit">
          <div className="border border-border rounded-xl p-4 mt-2.5 text-base leading-relaxed">
            ● <b>মোট নাম্বার:</b> ১০০ নাম্বার
            <hr className="my-1 border-border/50" />● <b>MCQ:</b> ৬০,{" "}
            <b>লিখিত:</b> ৪০
            <hr className="my-1 border-border/50" />● <b>মোট সময়:</b> ১.৫ ঘণ্টা
          </div>
          <Accordion type="multiple" className="w-full space-y-2 mt-2">
            <AccordionItem
              value="item-3-1"
              className="border border-border rounded-lg bg-card hover:bg-accent/50"
            >
              <AccordionTrigger className="p-3 text-base hover:no-underline">
                <div className="flex items-center">
                  <HelpCircle className="mr-2" />
                  <span>ব্যবসা বিভাগে কোন কোন বিষয় দাগাতে হবে?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-base">
                <b>=&gt; মোট ৫টি বিষয় দাগাতে হবে।</b>
                <br />
                <br />
                <b>✓ দাগানো বাধ্যতামূলক -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ বাংলা
                <br />
                &nbsp;&nbsp;&nbsp; ○ ইংরেজি
                <br />
                &nbsp;&nbsp;&nbsp; ○ হিসাববিজ্ঞান
                <br />
                &nbsp;&nbsp;&nbsp; ○ ব্যবসায় সংগঠন ও ব্যবস্থাপনা
                <br />
                <br />
                <b>✓ যেকোনো একটি –</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ উৎপাদন ব্যবস্থাপনা ও বিপণন
                <br />
                &nbsp;&nbsp;&nbsp; ○ ফিন্যান্স, ব্যাংকিং ও বিমা
                <br />
                <br />
                <div className="flex items-center">
                  <Info size={14} className="mr-1" /> প্রতিটি বিষয়ের MCQ প্রশ্ন:
                  ১২টি, নাম্বার: ১২ এবং লিখিত নাম্বার: ৮
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3-2"
              className="border border-border rounded-lg bg-card hover:bg-accent/50"
            >
              <AccordionTrigger className="p-3 text-base hover:no-underline">
                <div className="flex items-center">
                  <HelpCircle className="mr-2" />
                  <span>অন্য বিভাগে কোন কোন বিষয় দাগাতে হবে?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-base">
                <b>=&gt; মোট ৪টি বিষয় দাগাতে হবে।</b>
                <br />
                <br />
                <b>✓ দাগানো বাধ্যতামূলক -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ বাংলা
                <br />
                &nbsp;&nbsp;&nbsp; ○ ইংরেজী
                <br />
                &nbsp;&nbsp;&nbsp; ○ আইসিটি
                <br />
                <br />
                <b>✓ যেকোনো একটা -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ○ গণিত
                <br />
                &nbsp;&nbsp;&nbsp; ○ পরিসংখ্যান
                <br />
                &nbsp;&nbsp;&nbsp; ○ অর্থনীতি
                <br />
                <br />
                <div className="flex items-center">
                  <Info size={14} className="mr-1" /> আইসিটি ব্যাতীত প্রতিটি
                  বিষয়ের MCQ-১২ ও লিখিত-১০, আইসিটি এর MCQ-২৪ ও লিখিত-১০
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="cha-unit">
          <div className="border border-border rounded-xl p-4 mt-2.5 text-base leading-relaxed">
            ● <b>মোট নাম্বার:</b> ১০০ নাম্বার
            <hr className="my-1 border-border/50" />● <b>MCQ:</b> ৪০,{" "}
            <b>অঙ্কন:</b> ৬০
            <hr className="my-1 border-border/50" />● <b>মোট সময়:</b> ১.৫ ঘণ্টা
            <br />
            <br />
            <b>ক) বহুনির্বাচনি (MCQ) = ৪০ - সাধারণ জ্ঞান</b>
            <br />
            <div className="flex items-start text-sm mt-1">
              <AlertTriangle
                size={20}
                className="mr-1 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5"
              />
              <b>নোট:</b> পরীক্ষায় মাধ্যমিক ও উচ্চ মাধ্যমিক পর্যায়ে পঠিত বাংলা ও
              ইংরেজিসহ চারুকলার বিভিন্ন বিভাগ সম্পর্কিত বা বিষয় ভিত্তিক প্রশ্ন
              এবং শিল্প, সাহিত্য, সংস্কৃতি, ইতিহাস, ঐতিহ্য, সমসাময়িক ঘটনাবলি
              বিষয়ে প্রশ্ন থাকে।
            </div>
            <br />
            <b>খ) অঙ্কন = ৬০</b>
            <br />
            অঙ্কন পরীক্ষায় হিউম্যান ফিগার ড্রইংয়ের (মানুষের বিভিন্ন দেহ ভঙ্গির
            ফটোগ্রাফ) প্রশ্ন থাকে।
          </div>
        </TabsContent>
        <TabsContent value="iba-unit">
          <Accordion type="multiple" className="w-full space-y-2 mt-2">
            <AccordionItem
              value="item-5-1"
              className="border border-border rounded-lg bg-card hover:bg-accent/50"
            >
              <AccordionTrigger className="p-3 text-base hover:no-underline">
                <div className="flex items-center">
                  <HelpCircle className="mr-2" />
                  <span>আইবিএ কী? সম্পূর্ণ বিস্তারিত</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-base">
                এটি ঢাকা বিশ্ববিদ্যালয়ের একটি স্বতন্ত্র ইউনিট। পরীক্ষাও আলাদা
                ধাচে হবে। লিখিত ও মৌখিক দুই ধাপে হবে।
                <br />
                <br />
                <ExternalLink
                  href="/IBA/"
                  text="আইবিএ এর সম্পূর্ণ বিস্তারিত রিভিউ"
                />
                <br />
                <br />
                আইবিএ মূলত বিবিএ এর মডিফায়েড ভার্সন। বিবিএ&apos;র প্রফেশনালস
                ভার্সন আইবিএ। ঢাকা বিশ্ববিদ্যালয় ছাড়াও জাহাঙ্গীরনগর ও রাজশাহী
                বিশ্ববিদ্যালয়েও আইবিএ ডিপার্টমেন্ট রয়েছে তবে আইবিএ বলতে মূলত
                ঢাকা বিশ্ববিদ্যালয়ের আইবিএ&apos;ই বুঝায় এবং জাহাঙ্গীরনগর ও
                রাজশাহী বিশ্ববিদ্যালয় থেকেই আলাদা ঢাকা বিশ্ববিদ্যালয়ের আইবিএ
                ইউনিট। আর দেশের কর্পোরেট ওয়ার্ল্ডের টপ লেভেলের ম্যাগনেটদের
                অধিকাংশই ঢাকা বিশ্ববিদ্যালয়ের এই ইউনিট থেকে পাস করা।
                <br />
                <br />
                সাধারণ বা মাদ্রাসা যেকোন শিক্ষাবোর্ডের যেকোন বিভাগের
                (বিজ্ঞান,বাণিজ্য ও মানবিক) শিক্ষার্থীরা আবেদন ও পরীক্ষা দিতে
                পারবে। বাংলা ও ইংরেজি উভয় মিডিয়ামের শিক্ষার্থীরা পরীক্ষা দিতে
                পারবে।
                <br />
                <br />
                আইবিএ ইউনিটে প্রস্তুতির জন্য নির্দিষ্ট ও ধরাবাধা কোন সিলেবাস
                নেই। তবে ইংরেজিতে সাধারণত Grammar, Comprehension ও Vocabulary
                উপর ভিত্তি করে প্রশ্ন করা হয়। গণিতে সাধারণত বীজগণিত, পাটিগণিত ও
                জ্যামিতি থেকে প্রশ্ন হয়। আর Analytical Ability এর প্রশ্নে
                বৈচিত্র‍্য থাকলেও Puzzle matching, Critical Reasoning বা কোন
                ঘটনার সবচেয়ে সঠিক কারণ নির্ণয় করা, Data Sufficiency বা প্রদত্ত
                তথ্য যথেষ্ট কি না ইত্যাদি থাকে।
                <br />
                <br />
                প্রতিটি বিষয়ে আলাদা আলাদা ভাবে পাস করতে হবে। প্রচলিত নিয়ম
                অনুযায়ী, প্রতিটি বিষয়ে ৬০% নাম্বার না পেলে উত্তীর্ণ হওয়ার
                সম্ভাবনা কম।
                <br />
                <br />
                আইবিএ তে মোট আসন সংখ্যা ১২০ টি। লিখিত পরীক্ষার পর সাধারণত মৌখিক
                পরীক্ষার জন্য ১৬০-১৮০ জনকে নির্বাচিত করা হয়। পরবর্তীতে মৌখিক
                পরীক্ষার ভিত্তিতে ১২০ জন চূড়ান্ত ভর্তির সুযোগ পায়।
                <br />
                <br />
                <b>ক্রেডিট:</b> Admission Informer
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <hr className="my-2 border-border/50" />
          <div className="border border-border rounded-xl p-4 mt-2.5 text-base leading-relaxed">
            ● <b>মোট নাম্বার:</b> ১০০ নাম্বার
            <hr className="my-1 border-border/50" />● <b>MCQ:</b> ৭০,{" "}
            <b>বর্ণনামূলক:</b> ৩০
            <hr className="my-1 border-border/50" />● <b>মোট সময়:</b> ২ ঘণ্টা
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-2 mt-2"
          >
            <AccordionItem
              value="item-5-2"
              className="border border-border rounded-lg bg-card hover:bg-accent/50"
            >
              <AccordionTrigger className="p-3 text-base hover:no-underline">
                <div className="flex items-center">
                  <HelpCircle className="mr-2" />
                  <span>
                    মানবণ্টন, নুন্যতম নাম্বার ও কোন কোন বিষয় দাগাতে হবে?
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-base">
                <b>=&gt; নিম্নলিখিত সব বিষয় দাগাতে হবে।</b>
                <br />
                <br />
                <b>✓ বহুনির্বাচনি (MCQ) -</b>
                <br />
                &nbsp;&nbsp;&nbsp; ➤ ইংরেজী
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>মোট নাম্বার:</b> ৩০
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>নুন্যতম পেতে হবে:</b> ১০
                <br />
                &nbsp;&nbsp;&nbsp; ➤ গণিত
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>মোট নাম্বার:</b> ২৫
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>নুন্যতম পেতে হবে:</b> ৮.৩৩
                <br />
                &nbsp;&nbsp;&nbsp; ➤ বিশ্লেষণাত্মক দক্ষতা
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>মোট নাম্বার:</b> ১৫
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>নুন্যতম পেতে হবে:</b> ৫
                <br />
                <br />
                <b>✓ বর্ণনামূলক –</b>
                <br />
                &nbsp;&nbsp;&nbsp; ➤ Argumentative writing/Descriptive
                writing/Critical writing/Thematic writeup etc.
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>মোট নাম্বার:</b> ৩০
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○ <b>নুন্যতম পেতে হবে:</b> ১৫
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
      <div className="border border-border/80 rounded-xl p-4 mt-2.5 text-base">
        {generalInfo.points.map((point: GeneralInfoPoint, index: number) => (
          <React.Fragment key={index}>
            ● <b>{point.label}ঃ </b>
            {point.value}
            {index < generalInfo.points.length - 1 && (
              <hr className="my-1 border-border/50" />
            )}
          </React.Fragment>
        ))}
      </div>

      <h2
        id="Result"
        className="bg-primary/10 text-primary rounded-xl p-3 mt-8 mb-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <BarChart3 className="mr-2" size={16} /> {result.title}
      </h2>
      <span className="text-base">
        ● <b>ফলাফল প্রকাশ:</b> {result.date}
        <hr className="my-1 border-border/50" />
        <b>
          <LinkIcon className="inline-block mr-2" size={18} />
          লিংকঃ
        </b>{" "}
        <ExternalLink
          href={result.link}
          text={result.link.replace("https://", "")}
        />
      </span>
    </div>
  );
};

export default DhakaAdmissionInfo;
