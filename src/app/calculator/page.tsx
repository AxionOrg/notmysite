"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { University } from "lucide-react";
import { allData } from "@/lib/data/_generated";

interface ResultState {
  studentName?: string;
  isError: boolean;
  message: string;
  rawTotal?: number;
  maxTotal?: number;
  adjustedTotal?: number;
  percentage?: number;
  required?: number;
  eligibleByMarks?: boolean;
}

interface Deduction {
  label: string;
  value: number;
}

interface Circular {
  title: string;
  desc: string;
}

const EligibilityCheckerPage = () => {
  const [name, setName] = useState("");
  const [sscYear, setSscYear] = useState("2019");
  const [sscGpa, setSscGpa] = useState("5");
  const [hscYear, setHscYear] = useState("2021");
  const [hscGpa, setHscGpa] = useState("5");
  const [dept, setDept] = useState("medical");
  const [isSecondTimer, setIsSecondTimer] = useState(false);
  const [marks, setMarks] = useState({
    physics: "80",
    chemistry: "80",
    math: "80",
    bio: "80",
    eng: "80",
  });
  const [result, setResult] = useState<ResultState | null>(null);
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [deductions, setDeductions] = useState<Deduction[]>([]);

  const { CIRCULARS, THRESHOLDS } = allData.calculatorContent;

  const computeDeductions = (
    dept: string,
    hsc_gpa: number,
    isSecond: boolean,
  ): Deduction[] => {
    const deductionsArr = [];
    if (hsc_gpa < 5) {
      deductionsArr.push({
        label: "HSC GPA < 5.00 → Deduct 2 marks",
        value: 2,
      });
    }
    if (isSecond) {
      deductionsArr.push({ label: "Second-timer → Deduct 5 marks", value: 5 });
    }
    return deductionsArr;
  };

  const checkEligibility = () => {
    const ssc = Number(sscYear);
    const hsc = Number(hscYear);
    const hscGpaNum = Number(hscGpa) || 0;
    const studentName = name || "আপনি";

    const mPhy = Number(marks.physics) || 0;
    const mChem = Number(marks.chemistry) || 0;
    const mMath = Number(marks.math) || 0;
    const mBio = Number(marks.bio) || 0;
    const mEng = Number(marks.eng) || 0;

    const gap = hsc - ssc;
    const eligibleByGap = !isNaN(ssc) && !isNaN(hsc) && gap <= 2 && gap >= 0;

    setCirculars([]);
    setDeductions([]);

    if (!Number.isFinite(ssc) || !Number.isFinite(hsc)) {
      setResult({
        isError: true,
        message: "অনুগ্রহ করে সঠিক বছর লিখুন।",
      });
      return;
    }

    if (!eligibleByGap) {
      setResult({
        isError: true,
        message: `দুঃখিত ${studentName}, আপনি এলিজিবল নন। SSC ও HSC সালের মধ্যে ব্যবধান (gap) দুই বছরের বেশি — SSC: ${ssc}, HSC: ${hsc} (gap = ${gap}).\nশর্ত পূরণ করতে হবে: HSC year - SSC year ≤ 2`,
      });
      return;
    }

    const subjectTotal = mPhy + mChem + mMath + mBio + mEng;
    const maxTotal = 500;

    const currentDeductions = computeDeductions(dept, hscGpaNum, isSecondTimer);
    const totalDeduct = currentDeductions.reduce((s, d) => s + d.value, 0);
    const adjustedTotal = Math.max(0, subjectTotal - totalDeduct);
    const percentage = (adjustedTotal / maxTotal) * 100;

    const required = THRESHOLDS[dept as keyof typeof THRESHOLDS] || 60;
    const eligibleByMarks = percentage >= required;

    setResult({
      isError: false,
      studentName: studentName,
      rawTotal: subjectTotal,
      maxTotal: maxTotal,
      adjustedTotal: adjustedTotal,
      percentage: percentage,
      required: required,
      eligibleByMarks: eligibleByMarks,
      message: eligibleByMarks
        ? `অভিনন্দন — আপনি আমার সিস্টেম অনুযায়ী এলিজিবল।`
        : `দুঃখিত — আপনার শতাংশ ${percentage.toFixed(
            2,
          )}%। কর্তিত মান প্রয়োজনীয়তার নিচে: ${required}%।`,
    });

    if (eligibleByMarks) {
      setCirculars(CIRCULARS[dept as keyof typeof CIRCULARS] || []);
    }
    setDeductions(currentDeductions);
  };

  const resetForm = () => {
    setName("");
    setSscYear("2019");
    setSscGpa("5");
    setHscYear("2021");
    setHscGpa("5");
    setDept("medical");
    setIsSecondTimer(false);
    setMarks({
      physics: "80",
      chemistry: "80",
      math: "80",
      bio: "80",
      eng: "80",
    });
    setResult(null);
    setCirculars([]);
    setDeductions([]);
  };

  const ResultDisplay = () => {
    if (!result) {
      return <p>ফর্ম পূরণ করে &quot;Check Eligibility&quot; ক্লিক করুন।</p>;
    }
    if (result.isError) {
      return (
        <div className="text-red-500 whitespace-pre-line">{result.message}</div>
      );
    }
    return (
      <div>
        <div className="text-green-400">
          শিক্ষার্থী: <strong>{result.studentName}</strong>
        </div>
        <div className="text-sm mt-2">
          Raw Total:{" "}
          <strong>
            {result.rawTotal} / {result.maxTotal}
          </strong>
          . After deductions:{" "}
          <strong>
            {result.adjustedTotal} / {result.maxTotal}
          </strong>
          . শতাংশ: <strong>{result.percentage?.toFixed(2)}%</strong>.
        </div>
        <div className="mt-2">
          Department Required: <strong>{result.required}%</strong>.
        </div>
        <div
          className={`font-bold mt-4 ${
            result.eligibleByMarks ? "text-green-400" : "text-red-500"
          }`}
        >
          {result.message}
        </div>
      </div>
    );
  };

  return (
    <div className="font-bengali bg-background py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <University className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">
            University Eligibility Checker
          </h1>
          <p className="text-muted-foreground mt-2">
            প্রো লেভেল UI — ইনপুট দিন এবং চেক করুন কে এলিজিবল।
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>শিক্ষার্থী তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Student Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="নাম লিখুন (ঐচ্ছিক)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ssc">SSC Year</Label>
                  <Input
                    id="ssc"
                    type="number"
                    value={sscYear}
                    onChange={(e) => setSscYear(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ssc_gpa">SSC GPA</Label>
                  <Input
                    id="ssc_gpa"
                    type="number"
                    min="0"
                    max="5"
                    step="0.01"
                    value={sscGpa}
                    onChange={(e) => setSscGpa(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hsc">HSC Year</Label>
                  <Input
                    id="hsc"
                    type="number"
                    value={hscYear}
                    onChange={(e) => setHscYear(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hsc_gpa">HSC GPA</Label>
                  <Input
                    id="hsc_gpa"
                    type="number"
                    min="0"
                    max="5"
                    step="0.01"
                    value={hscGpa}
                    onChange={(e) => setHscGpa(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dept">Department / Apply for</Label>
                <Select value={dept} onValueChange={setDept}>
                  <SelectTrigger id="dept">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="university">
                      University (General)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="second_timer"
                  checked={isSecondTimer}
                  onCheckedChange={(checked) => setIsSecondTimer(!!checked)}
                />
                <Label htmlFor="second_timer">
                  Second-timer / সেকেন্ড টাইম আবেদন করছেন?
                </Label>
              </div>

              <hr className="border-border/50 my-4" />

              <h4 className="font-semibold">
                পাঠ্য বিষয়গুলোর মার্ক (প্রতি বিষয় ০–১০০)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="marks_physics">Physics (ফিজিক্স)</Label>
                  <Input
                    id="marks_physics"
                    type="number"
                    min="0"
                    max="100"
                    value={marks.physics}
                    onChange={(e) =>
                      setMarks({ ...marks, physics: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="marks_chemistry">
                    Chemistry (কেমিস্ট্রি)
                  </Label>
                  <Input
                    id="marks_chemistry"
                    type="number"
                    min="0"
                    max="100"
                    value={marks.chemistry}
                    onChange={(e) =>
                      setMarks({ ...marks, chemistry: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="marks_math">Math (ম্যাথ)</Label>
                  <Input
                    id="marks_math"
                    type="number"
                    min="0"
                    max="100"
                    value={marks.math}
                    onChange={(e) =>
                      setMarks({ ...marks, math: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="marks_bio">Biology (বায়োলজি)</Label>
                  <Input
                    id="marks_bio"
                    type="number"
                    min="0"
                    max="100"
                    value={marks.bio}
                    onChange={(e) =>
                      setMarks({ ...marks, bio: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="marks_eng">English (ইংরেজি)</Label>
                  <Input
                    id="marks_eng"
                    type="number"
                    min="0"
                    max="100"
                    value={marks.eng}
                    onChange={(e) =>
                      setMarks({ ...marks, eng: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={checkEligibility} className="w-full">
                  Check Eligibility
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="w-full"
                >
                  Reset
                </Button>
              </div>

              <div className="text-xs text-muted-foreground p-3 bg-muted rounded-md mt-4">
                <strong>নোট:</strong> SSC এবং HSC এর মধ্যে gap সর্বোচ্চ ২ বছর
                হতে হবে (HSC year - SSC year ≤ 2)।
                মেডিকেল/ইঞ্জিনিয়ারিং/ভার্সিটি - HSC GPA ৫.০০ এর কম হলে{" "}
                <strong>-2 মার্ক</strong> কাটা যাবে। যদি আপনি সেকেন্ড টাইম হন
                তাহলে <strong>-5 মার্ক</strong> কাটা হবে। (এই ডিডাকশনগুলো মোট
                ভর্তি পরীক্ষার মার্ক থেকে কাটা হবে।)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>রেজাল্ট ও সার্কুলার</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 min-h-[60px]">
                <ResultDisplay />
              </div>

              {circulars.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">
                    আপনার বিভাগের সংশ্লিষ্ট সার্কুলার
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {circulars.map((c, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card">
                        <h5 className="font-bold">{c.title}</h5>
                        <p className="text-sm text-muted-foreground">
                          {c.desc}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => alert(`Open circular: ${c.title}`)}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {deductions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold mb-2">কর্তন বিবরন</h4>
                  {deductions.map((d, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-2 bg-muted/50 rounded-md"
                    >
                      <span>{d.label}</span>
                      <span className="font-bold">-{d.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="font-bold">Total Deduction</span>
                    <span className="font-bold">
                      -{deductions.reduce((total, d) => total + d.value, 0)}
                    </span>
                  </div>
                </div>
              )}
              <footer className="text-center mt-8 text-sm text-muted-foreground">
                <p>Developed for you — প্রো স্টাইল UI.</p>
              </footer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EligibilityCheckerPage;
