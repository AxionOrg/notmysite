"use client";
import { Info, PenSquare, Banknote, MapPin } from "lucide-react";
import { allData } from "@/lib/data/_generated";

const PrivateAdmissionInfo = () => {
  const { apply, examDate, examCenter, generalInfo, title } =
    allData.schedulesOthers.private;

  return (
    <div
      id="Info"
      className="mt-8 w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg relative text-left"
    >
      <div className="flex justify-center">
        <div className="gradient-background inline-block px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
          {title}
        </div>
      </div>

      <h2
        id="Apply"
        className="bg-primary/10 text-primary rounded-xl p-3 my-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <PenSquare className="mr-2" /> {apply.title}
      </h2>
      <span className="text-base">
        <b>➜ আবেদন শুরু ও শেষঃ</b> {apply.schedule}
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
        ✔{" "}
        <b>
          <u>{apply.qualificationTitle}</u>
        </b>
        <hr className="my-1 border-border/50" />
        <p>{apply.qualificationDetails}</p>
      </div>
      <hr className="my-2 border-border/50" />

      <h2
        id="ExamDate"
        className="bg-primary/10 text-primary rounded-xl p-3 my-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <Info className="mr-2" /> {examDate.title}
      </h2>
      <span className="text-base">{examDate.details}</span>
      <hr className="my-2 border-border/50" />

      <h2
        id="Location"
        className="bg-primary/10 text-primary rounded-xl p-3 my-4 text-center text-lg font-bold flex items-center justify-center"
      >
        <MapPin className="mr-2" /> {examCenter.title}
      </h2>
      <span className="text-base">{examCenter.details}</span>

      <div id="MarkDistributionAndOthers"></div>
      <h2 className="bg-primary/10 text-primary rounded-xl p-3 my-4 text-center text-lg font-bold flex items-center justify-center">
        <Info className="mr-2" /> {generalInfo.title}
      </h2>
      <p className="text-base">{generalInfo.details}</p>
    </div>
  );
};

export default PrivateAdmissionInfo;
