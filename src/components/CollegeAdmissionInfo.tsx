"use client";
import {
  Link as LinkIcon,
  Timer,
  BarChart3,
  PenSquare,
  Banknote,
  Ticket,
} from "lucide-react";
import { allData } from "@/lib/data/_generated";
import ExternalLink from "./common/ExternalLink";

const CollegeAdmissionInfo = () => {
  const { apply, admitCard, examDate, result, generalInfo } =
    allData.schedulesOthers.college;

  return (
    <div
      id="Info"
      className="mt-8 w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg relative text-left"
    >
      <div className="flex justify-center">
        <div className="gradient-background inline-block px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
          {generalInfo.title}
        </div>
      </div>

      <h2
        id="Apply"
        className="bg-primary/10 text-primary rounded-xl p-3 my-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <PenSquare className="mr-2" /> {apply.title}
      </h2>
      <span className="text-base">
        <b>➜ আবেদন শুরুঃ</b> {apply.startDate}
        <br />
        <b>➜ আবেদন শেষঃ</b> {apply.endDate}
      </span>
      <div className="my-2">
        <b>
          <Banknote className="inline-block mr-2" />
          আবেদন ফিঃ
        </b>{" "}
        {apply.fee}
      </div>

      <hr className="my-2 border-border/50" />

      <div className="text-base">
        <b>
          <LinkIcon className="inline-block mr-2" size={16} />
          লিংকঃ
        </b>{" "}
        <ExternalLink
          href={apply.link}
          text={apply.link.replace("http://", "").replace("/", "")}
        />
        <br />
        <br />✔{" "}
        <b>
          <u>{apply.qualificationTitle}</u>
        </b>
        <hr className="my-1 border-border/50" />
        <p>{apply.qualificationDetails}</p>
      </div>
      <hr className="my-2 border-border/50" />

      <h2
        id="AdmitCard"
        className="bg-primary/10 text-primary rounded-xl p-3 my-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <Ticket className="mr-2" /> {admitCard.title}
      </h2>
      <span className="text-base">{admitCard.details}</span>

      <h2
        id="ExamDate"
        className="bg-primary/10 text-primary rounded-xl p-3 my-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <Timer className="mr-2" /> {examDate.title}
      </h2>
      <span className="text-base">{examDate.details}</span>
      <hr className="my-2 border-border/50" />
      <div className="border border-border/80 p-3 text-center rounded-md">
        সব কলেজের <b>ভর্তির তারিখ</b> জানতে ভিজিট করুন{" "}
        <b>
          <ExternalLink href={examDate.note.link} text={examDate.note.text} />
        </b>
      </div>

      <h2
        id="Result"
        className="bg-primary/10 text-primary rounded-xl p-3 my-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <BarChart3 className="mr-2" /> {result.title}
      </h2>
      <span className="text-base">
        ● <b>ফলাফল প্রকাশ:</b> {result.date}
        <hr className="my-1 border-border/50" />
        <b>
          <LinkIcon className="inline-block mr-2" size={16} />
          লিংকঃ
        </b>{" "}
        <ExternalLink
          href={result.link}
          text={result.link.replace("http://", "").replace("/", "")}
        />
      </span>
    </div>
  );
};

export default CollegeAdmissionInfo;
