"use client";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import PreviousYearCirculars from "@/components/common/PreviousYearCirculars";
import Link from "next/link";

interface CircularProps {
  title: string;
  note?: string;
  downloadLink: string;
  showPreviousYears?: boolean;
  previousCirculars?: { href: string; text: string }[];
}

const Circular = ({
  title,
  note,
  downloadLink,
  showPreviousYears = false,
  previousCirculars,
}: CircularProps) => {
  const isTelegramLink = downloadLink.startsWith("https://t.me/");
  return (
    <div
      id="Circular"
      className="mt-4 w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg text-center relative"
    >
      <div className="flex justify-center">
        <div className="gradient-background inline-block px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
          সার্কুলার
        </div>
      </div>
      <div className="text-center">
        <span className="text-lg">
          <b>{title}</b>
        </span>
        <br />
        {note && <span className="text-muted-foreground text-sm">{note}</span>}
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 mt-5 justify-center">
        <Button
          asChild
          className="bg-primary text-primary-foreground flex-1 min-w-[150px] hover:bg-background hover:text-primary border hover:border-primary"
        >
          <Link
            href={downloadLink}
            target={isTelegramLink ? "_blank" : undefined}
            rel={isTelegramLink ? "noopener noreferrer" : undefined}
          >
            <Download size={16} className="mr-2" /> ডাউনলোড করুন
          </Link>
        </Button>
        {showPreviousYears && (
          <PreviousYearCirculars circulars={previousCirculars} />
        )}
      </div>
    </div>
  );
};

export default Circular;
