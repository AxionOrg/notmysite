import { NextResponse } from "next/server";
import { allData } from "@/lib/data";

export async function GET() {
  try {
    const calendarEvents = allData.CalendarInfo.map((event) => ({
      id: event.id,
      title: event.universityNameAndUnit,
      examDate: event.examDetails.date,
      examCountdown: event.examDetails.ExamCountdownDate,
    }));

    return NextResponse.json(calendarEvents);
  } catch (error) {
    console.error("Failed to fetch calendar data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
