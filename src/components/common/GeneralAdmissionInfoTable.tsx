"use client";

import { allData } from "@/lib/data/_generated";
import ExternalLink from "./ExternalLink";
import { Badge } from "@/components/ui/badge";

interface GeneralAdmissionInfoTableProps {
  searchTerm: string;
}

const GeneralAdmissionInfoTable = ({
  searchTerm,
}: GeneralAdmissionInfoTableProps) => {
  const filteredInfo = allData.schedulesGeneral.filter((info) =>
    info.university.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full space-y-4">
      {/* Header for larger screens */}
      <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-center">
        <div>বিশ্ববিদ্যালয়</div>
        <div>তারিখ</div>
        <div>মানবন্টন</div>
        <div>সিলেবাস</div>
        <div>সেকেন্ড টাইম</div>
        <div>নেগেটিভ মার্কিং</div>
      </div>

      {filteredInfo.map((info, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-0 shadow-sm md:grid md:grid-cols-6 md:gap-4 md:items-start md:p-4"
        >
          {/* Mobile view with labels */}
          <div className="md:hidden p-4 border-l-4 border-primary rounded-l-lg space-y-3">
            <div className="flex justify-between items-start pb-2 border-b border-border/50">
              <span className="font-semibold text-muted-foreground">
                বিশ্ববিদ্যালয়:
              </span>
              <div className="text-right">
                <span className="font-medium truncate">{info.university}</span>
                <div className="flex gap-2 mt-1 flex-wrap justify-end">
                  {info.circularLink && (
                    <Badge variant="outline">
                      <ExternalLink href={info.circularLink} text="সার্কুলার" />
                    </Badge>
                  )}
                  {info.questionBankLink && (
                    <Badge variant="outline">
                      <ExternalLink
                        href={info.questionBankLink}
                        text="প্রশ্নব্যাংক"
                      />
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start pb-2 border-b border-border/50">
              <span className="font-semibold text-muted-foreground">
                তারিখ:
              </span>
              <span
                className="text-right"
                dangerouslySetInnerHTML={{ __html: info.date }}
              ></span>
            </div>
            <div className="flex justify-between items-start pb-2 border-b border-border/50">
              <span className="font-semibold text-muted-foreground">
                মানবন্টন:
              </span>
              <span
                className="text-right cell-content"
                dangerouslySetInnerHTML={{ __html: info.marksDistribution }}
              ></span>
            </div>
            <div className="flex justify-between items-start pb-2 border-b border-border/50">
              <span className="font-semibold text-muted-foreground">
                সিলেবাস:
              </span>
              <span className="text-right">{info.syllabus}</span>
            </div>
            <div className="flex justify-between items-start pb-2 border-b border-border/50">
              <span className="font-semibold text-muted-foreground">
                সেকেন্ড টাইম:
              </span>
              <span className="text-right">{info.secondTime}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="font-semibold text-muted-foreground">
                নেগেটিভ মার্কিং:
              </span>
              <span className="text-right">{info.negativeMarking}</span>
            </div>
          </div>

          {/* Desktop view (grid layout) */}
          <div className="hidden md:block font-medium text-center">
            <div className="font-bold">{info.university}</div>
            <div className="flex gap-2 mt-1 flex-wrap justify-center">
              {info.circularLink && (
                <Badge variant="outline">
                  <ExternalLink href={info.circularLink} text="সার্কুলার" />
                </Badge>
              )}
              {info.questionBankLink && (
                <Badge variant="outline">
                  <ExternalLink
                    href={info.questionBankLink}
                    text="প্রশ্নব্যাংক"
                  />
                </Badge>
              )}
            </div>
          </div>
          <div
            className="hidden md:block text-center whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: info.date }}
          ></div>
          <div
            className="hidden md:block text-center cell-content whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: info.marksDistribution }}
          ></div>
          <div className="hidden md:block text-center">{info.syllabus}</div>
          <div className="hidden md:block text-center">{info.secondTime}</div>
          <div className="hidden md-block text-center">
            {info.negativeMarking}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneralAdmissionInfoTable;
