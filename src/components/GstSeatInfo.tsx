"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import ExternalLink from "./common/ExternalLink";

const GstSeatInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const universities = [
    { name: "ইসলামী বিশ্ববিদ্যালয়", id: "iu" },
    {
      name: "গোপালগঞ্জ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      id: "gstu",
    },
    {
      name: "নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      id: "nstu",
    },
    { name: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর", id: "brur" },
    {
      name: "জাতীয় কবি কাজী নজরুল ইসলাম বিশ্ববিদ্যালয়",
      id: "jkkniu",
    },
    { name: "পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়", id: "pust" },
    { name: "যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়", id: "just" },
    {
      name: "মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      id: "mbstu",
    },
    {
      name: "পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      id: "pstu",
    },
    {
      name: "জামালপুর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      id: "jstu",
    },
    { name: "রবীন্দ্র বিশ্ববিদ্যালয়", id: "rub" },
    { name: "পিরোজপুর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়", id: "prstu" },
    { name: "রাঙামাটি বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়", id: "rmstu" },
    { name: "সুনামগঞ্জ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়", id: "sstu" },
    { name: "কিশোরগঞ্জ বিশ্ববিদ্যালয়", id: "kiu" },
    { name: "গাজীপুর ডিজিটাল ইউনিভার্সিটি", id: "uftb" },
    { name: "চাঁদপুর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়", id: "cstu" },
    { name: "নেত্রকোণা বিশ্ববিদ্যালয়", id: "neu" },
  ];

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      id="Subjects"
      className="mt-4 w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg text-center relative"
    >
      <div className="flex justify-center">
        <div className="gradient-background inline-block px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
          গুচ্ছভুক্ত বিশ্ববিদ্যালয়ের বিষয় ও আসন সংখ্যা
        </div>
      </div>

      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="🔎 বিশ্ববিদ্যালয় খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8"
        />
      </div>

      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">বিশ্ববিদ্যালয়</TableHead>
            <TableHead className="text-center w-auto">লিংক</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUniversities.map((uni) => (
            <TableRow key={uni.id} className="text-center">
              <TableCell>{uni.name}</TableCell>
              <TableCell>
                <ExternalLink href={`/${uni.id}#Subjects`} text="[লিংক]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GstSeatInfo;
