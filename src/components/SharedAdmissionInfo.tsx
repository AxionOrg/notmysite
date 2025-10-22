
"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FilePenLine,
  Banknote,
  CircleCheck,
  Link as LinkIcon,
  CircleAlert,
  Dock,
  Timer,
  MapPinned,
  BarChart3,
  CalendarClock,
  PackageCheck,
  ListChecks,
  Target,
} from "lucide-react";
import { allData } from "@/lib/data/_generated";
import ExternalLink from "./common/ExternalLink";
import type { University } from "@/lib/supabase/database.types";

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
  requirement?: string;
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
    paymentMethod?: {
      title: string;
      details: string;
    };
  };
  unitRequirements: {
    title: string;
    units: UnitRequirement[];
  };
  admitCard: {
    title: string;
    startDate: string;
    endDate: string;
    link: string;
    linkNote?: string;
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
    content: string;
  };
}

interface SharedAdmissionInfoProps {
  university: University;
}

const SharedAdmissionInfo = ({ university }: SharedAdmissionInfoProps) => {
  const uniData = allData.universities.find((uni) => uni.id === university.id);

  if (!uniData || !uniData.admissionInfo) {
    return <div>No admission information available</div>;
  }

  const admissionInfo = uniData.admissionInfo as AdmissionInfoData;

  const {
    apply,
    unitRequirements,
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
            আবেদন ফিঃ
          </b>
          <br />
          {apply.fees.map((fee: Fee, index: number) => (
            <div key={index}>
              &nbsp;&nbsp;&nbsp; ✓ {fee.unit}
              {fee.unit && ": "}
              {fee.amount}
            </div>
          ))}
        </div>
        <br />
        {apply.helpfulLinks && apply.helpfulLinks.length > 0 && (
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
        )}
      </div>

      <div className="text-base mt-4">
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
        <div className="text-green-600 dark:text-green-500 flex items-center">
          <CircleCheck size={18} className="inline-block mr-1" />{" "}
          <b>সেকেন্ড টাইম:</b>&nbsp;
          <span
            dangerouslySetInnerHTML={{
              __html: apply.secondTime,
            }}
          />
        </div>

        {apply.paymentMethod && (
          <div className="mt-4">
            <b>
              <Target className="inline-block mr-2" size={24} />
              {apply.paymentMethod.title}
            </b>
            <br />
            <p className="mt-1 ml-1">{apply.paymentMethod.details}</p>
          </div>
        )}
      </div>
      <hr className="my-3 border-border/50" />

      {unitRequirements && (
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
            <AccordionContent className="p-4 sm:p-5 text-base pt-0">
              {unitRequirements.units.map(
                (unit: UnitRequirement, index: number) => (
                  <div key={index}>
                    <b>❐ {unit.name}</b>
                    {unit.departments.map((dept: UnitDepartment, i: number) => (
                      <div key={i} className="ml-4">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: `✓ ${dept.name}${
                              dept.requirement ? `: ${dept.requirement}` : ""
                            }`,
                          }}
                        ></p>
                      </div>
                    ))}
                    {index < unitRequirements.units.length - 1 && (
                      <hr className="my-2 border-border/50" />
                    )}
                  </div>
                ),
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

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
          {admitCard.linkNote && <div>{admitCard.linkNote}</div>}
          <br />
          {admitCard.note && (
            <>
              <div dangerouslySetInnerHTML={{ __html: admitCard.note }} />
            </>
          )}
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
          <span
            key={index}
            dangerouslySetInnerHTML={{
              __html: `❐ <b>${
                date.unit && `"${date.unit}" ইউনিট: `
              }</b> ${date.date}`,
            }}
          ></span>
        ))}
      </span>
      <div className="border border-border/80 p-3 text-center rounded-md mt-3">
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
        <div dangerouslySetInnerHTML={{ __html: examCenter.note }} />
      </span>

      <div id="MarkDistributionAndOthers"></div>
      <h2 className="bg-primary/10 text-primary rounded-xl p-3 mt-8 mb-4 text-center text-lg font-bold flex items-center justify-center">
        <ListChecks className="mr-2" size={16} /> মানবণ্টন ও অন্যান্য তথ্য
      </h2>

      <div className="border border-border rounded-xl p-4 mt-2.5 text-base">
        {generalInfo.points.map((point, index) => (
          <React.Fragment key={index}>
            ● <b>{point.label}ঃ </b>
            <span dangerouslySetInnerHTML={{ __html: point.value }} />
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
      <span
        className="text-base"
        dangerouslySetInnerHTML={{ __html: result.content }}
      ></span>
    </div>
  );
};

export default SharedAdmissionInfo;
