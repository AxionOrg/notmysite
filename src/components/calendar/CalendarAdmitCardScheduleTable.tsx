"use client";

import { allData } from "@/lib/data/_generated";
import ExternalLink from "@/components/common/ExternalLink";
import SharedScheduleTable from "@/components/common/SharedScheduleTable";

const CalendarAdmitCardScheduleTable = () => {
  const admitCardSchedule = allData.CalendarInfo.filter((item) => {
    const { StartAndEndDate, DownloadCountdownDate, link } =
      item.admitCardDetails;
    return (
      StartAndEndDate !== null ||
      DownloadCountdownDate !== null ||
      link !== null
    );
  });

  const columns = [
    {
      header: "বিশ্ববিদ্যালয়",
      className: "w-1/3",
      accessor: (item: any) => (
        <span className="font-bold">{item.universityNameAndUnit}</span>
      ),
    },
    {
      header: "তারিখ",
      className: "w-1/3",
      accessor: (item: any) => (
        <span
          dangerouslySetInnerHTML={{
            __html: item.admitCardDetails.StartAndEndDate || "",
          }}
        />
      ),
    },
    {
      header: "লিংক",
      className: "w-1/3",
      accessor: (item: any) =>
        item.admitCardDetails.link ? (
          <ExternalLink href={item.admitCardDetails.link} text="[লিংক]" />
        ) : null,
    },
  ];

  return <SharedScheduleTable data={admitCardSchedule} columns={columns} />;
};

export default CalendarAdmitCardScheduleTable;
