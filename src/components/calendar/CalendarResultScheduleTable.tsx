"use client";

import { allData } from "@/lib/data/_generated";
import ExternalLink from "@/components/common/ExternalLink";
import SharedScheduleTable from "@/components/common/SharedScheduleTable";

const CalendarResultScheduleTable = () => {
  const resultSchedule = allData.CalendarInfo.filter((item) => {
    const { date, link } = item.resultDetails;
    return date !== null || link !== null;
  });

  const columns = [
    {
      header: "বিশ্ববিদ্যালয়",
      className: "w-1/3",
      accessor: (item: any) => (
        <span
          className="font-bold"
          dangerouslySetInnerHTML={{ __html: item.universityNameAndUnit }}
        />
      ),
    },
    {
      header: "তারিখ",
      className: "w-1/3",
      accessor: (item: any) => (
        <span
          dangerouslySetInnerHTML={{
            __html: item.resultDetails.date || "",
          }}
        />
      ),
    },
    {
      header: "লিংক",
      className: "w-1/3",
      accessor: (item: any) =>
        item.resultDetails.link ? (
          <ExternalLink href={item.resultDetails.link} text="[লিংক]" />
        ) : null,
    },
  ];

  return <SharedScheduleTable data={resultSchedule} columns={columns} />;
};

export default CalendarResultScheduleTable;
