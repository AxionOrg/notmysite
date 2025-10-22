"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Scroll,
  TimerIcon,
  FilePenLine,
  CheckCircle,
  BarChart,
  RotateCcw,
  Check,
  X,
} from "lucide-react";

type View = "config" | "test" | "answers" | "result";
type Answer = { q: number; value: string };
interface ResultBreakdown {
  q: number;
  userAnswer: string;
  correctAnswer?: string;
  status: "correct" | "incorrect" | "skipped";
}

export default function ExamPage() {
  const [view, setView] = useState<View>("config");

  // Config state
  const [testName, setTestName] = useState("");
  const [mcqNumber, setMcqNumber] = useState(10);
  const [timeLimit, setTimeLimit] = useState(10);
  const [negativeMarkValue, setNegativeMarkValue] = useState(0.25);

  // Test state
  const [timeLeft, setTimeLeft] = useState("");
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<Answer[]>([]);
  const [isSummaryVisible, setSummaryVisible] = useState(false);

  // Result state
  const [resultDetails, setResultDetails] = useState<ResultBreakdown[]>([]);
  const [resultStats, setResultStats] = useState({
    correctCount: 0,
    incorrectCount: 0,
    skippedCount: 0,
    totalScore: 0,
    percentage: 0,
    negativeMark: 0,
  });

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Handlers for Configuration View ---
  const startTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (mcqNumber <= 0 || timeLimit <= 0) {
      alert("অনুগ্রহ করে MCQ সংখ্যা এবং সময়সীমার জন্য বৈধ সংখ্যা লিখুন।");
      return;
    }
    setUserAnswers(Array(mcqNumber).fill(null));
    setCorrectAnswers(Array(mcqNumber).fill(null));
    setView("test");
  };

  // --- Handlers for Test View ---
  const handleAnswerChange = (qIndex: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = { q: qIndex + 1, value };
    setUserAnswers(newAnswers);
  };

  const submitTest = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setView("answers");
  };

  // --- Handlers for Correct Answers View ---
  const handleCorrectAnswerChange = (qIndex: number, value: string) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[qIndex] = { q: qIndex + 1, value };
    setCorrectAnswers(newCorrectAnswers);
  };

  const submitCorrectAnswers = () => {
    if (correctAnswers.some((a) => a === null)) {
      alert("অনুগ্রহ করে সকল সঠিক উত্তর নির্বাচন করুন।");
      return;
    }
    calculateResult();
    setView("result");
  };

  // --- Result Calculation ---
  const calculateResult = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    const breakdown: ResultBreakdown[] = [];

    const userAnswersMap = new Map(
      userAnswers.filter(Boolean).map((a) => [a.q, a.value]),
    );
    const correctAnswersMap = new Map(
      correctAnswers.map((a) => [a.q, a.value]),
    );

    for (let i = 1; i <= mcqNumber; i++) {
      const userAnswer = userAnswersMap.get(i);
      const correctAnswer = correctAnswersMap.get(i);
      let status: ResultBreakdown["status"] = "skipped";
      if (userAnswer) {
        if (userAnswer === correctAnswer) {
          correctCount++;
          status = "correct";
        } else {
          incorrectCount++;
          status = "incorrect";
        }
      }
      breakdown.push({
        q: i,
        userAnswer: userAnswer || "-",
        correctAnswer: correctAnswer,
        status: status,
      });
    }

    const skippedCount = mcqNumber - (correctCount + incorrectCount);
    const negativeMark = incorrectCount * negativeMarkValue;
    const totalScore = correctCount - negativeMark;
    const percentage = (correctCount / mcqNumber) * 100;

    setResultDetails(breakdown);
    setResultStats({
      correctCount,
      incorrectCount,
      skippedCount,
      totalScore,
      percentage,
      negativeMark,
    });
  };

  // --- Reset ---
  const restartTest = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTestName("");
    setMcqNumber(10);
    setTimeLimit(10);
    setNegativeMarkValue(0.25);
    setView("config");
  };

  // --- Timer Effect ---
  useEffect(() => {
    if (view !== "test") return;

    let timeRemaining = timeLimit * 60;
    const updateTimerDisplay = () => {
      if (timeRemaining <= 0) {
        clearInterval(timerIntervalRef.current!);
        setTimeLeft("সময় শেষ!");
        alert("সময় শেষ! পরীক্ষাটি স্বয়ংক্রিয়ভাবে জমা দেওয়া হবে।");
        submitTest();
      } else {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        setTimeLeft(
          `অবশিষ্ট সময়: ${String(minutes).padStart(2, "0")}মি ${String(
            seconds,
          ).padStart(2, "0")}সে`,
        );
        timeRemaining--;
      }
    };

    updateTimerDisplay();
    timerIntervalRef.current = setInterval(updateTimerDisplay, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, timeLimit]);

  const renderMcqInputs = (
    count: number,
    namePrefix: string,
    answers: Answer[],
    onChange: (index: number, value: string) => void,
    isCorrectAnswerView = false,
  ) => {
    const inputs = [];
    for (let i = 0; i < count; i++) {
      inputs.push(
        <Card
          key={`${namePrefix}-${i}`}
          id={`mcq-${i + 1}`}
          className="mb-4 animate-fade-in-up"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4">
            <p className="font-semibold text-lg mb-2 sm:mb-0 sm:mr-4 whitespace-nowrap">
              {isCorrectAnswerView
                ? `প্রশ্ন ${i + 1} এর সঠিক উত্তর:`
                : `প্রশ্ন. ${i + 1}:`}
            </p>
            <div className="flex items-center justify-end flex-wrap gap-x-4 w-full">
              {["A", "B", "C", "D"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${namePrefix}-${i + 1}-${option}`}
                    name={`${namePrefix}-${i + 1}`}
                    value={option}
                    className="h-5 w-5 accent-primary"
                    checked={answers[i]?.value === option}
                    onChange={() => onChange(i, option)}
                  />
                  <Label
                    htmlFor={`${namePrefix}-${i + 1}-${option}`}
                    className="text-lg font-medium cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>,
      );
    }
    return inputs;
  };

  const renderSummary = () => {
    const content = [];
    for (let i = 0; i < mcqNumber; i++) {
      const isAnswered = !!userAnswers[i];
      content.push(
        <div
          key={`summary-${i}`}
          className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded font-bold border ${
            isAnswered
              ? "bg-green-500 text-white border-green-600"
              : "bg-card border-border"
          }`}
          onClick={() => {
            document
              .getElementById(`mcq-${i + 1}`)
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
            setSummaryVisible(false);
          }}
        >
          {i + 1}
        </div>,
      );
    }
    return content;
  };

  return (
    <div className="container mx-auto px-2 py-8 max-w-4xl font-bengali">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text">OMR টেস্ট সিমুলেটর</h1>
        <p className="text-muted-foreground mt-2">
          সহজেই আপনার OMR-ভিত্তিক পরীক্ষা তৈরি ও পরিচালনা করুন!
        </p>
      </header>

      {view === "config" && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FilePenLine /> পরীক্ষার কনফিগারেশন
            </CardTitle>
            <CardDescription>
              আপনার নতুন পরীক্ষা এখানে সেট আপ করুন।
            </CardDescription>
          </CardHeader>
          <form onSubmit={startTest}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="testName">পরীক্ষার নাম:</Label>
                <Input
                  id="testName"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mcqNumber">MCQ সংখ্যা:</Label>
                <Input
                  id="mcqNumber"
                  type="number"
                  value={mcqNumber}
                  onChange={(e) => setMcqNumber(parseInt(e.target.value) || 0)}
                  required
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeLimit">সময়সীমা (মিনিটে):</Label>
                <Input
                  id="timeLimit"
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
                  required
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="negativeMarkValue">
                  নেগেটিভ মার্কিং (প্রতি ভুল উত্তরে):
                </Label>
                <Input
                  id="negativeMarkValue"
                  type="number"
                  value={negativeMarkValue}
                  onChange={(e) =>
                    setNegativeMarkValue(parseFloat(e.target.value) || 0)
                  }
                  step="0.01"
                  placeholder="যেমন: 0.25"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" size="lg">
                পরীক্ষা শুরু করুন
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {view === "test" && (
        <div className="relative animate-fade-in-up">
          <div
            className="fixed bottom-4 left-4 z-50"
            onMouseEnter={() => setSummaryVisible(true)}
            onMouseLeave={() => setSummaryVisible(false)}
          >
            <Button
              size="icon"
              className="rounded-full h-14 w-14 shadow-lg"
              onClick={() => setSummaryVisible(!isSummaryVisible)}
            >
              <Scroll className="h-6 w-6" />
            </Button>
            {isSummaryVisible && (
              <Card className="absolute bottom-16 left-0 w-64 p-2 shadow-xl">
                <CardHeader className="p-2 text-center">
                  <CardTitle className="text-base">
                    প্রশ্নাবলীর সারাংশ
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 flex flex-wrap gap-2">
                  {renderSummary()}
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mb-6 animate-fade-in-up">
            <CardHeader className="text-center">
              <CardTitle>{testName || "OMR পরীক্ষা"}</CardTitle>
              <CardDescription>
                মোট প্রশ্ন: {mcqNumber} | সময়সীমা: {timeLimit} মিনিট | নেগেটিভ
                মার্কিং:{" "}
                {negativeMarkValue > 0 ? `${negativeMarkValue}` : "নেই"}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="sticky top-[80px] z-30 mb-6">
            <div className="w-full text-center py-2 px-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 animate-fade-in-up">
              <p className="text-xl font-bold text-destructive flex items-center justify-center gap-2">
                <TimerIcon /> {timeLeft}
              </p>
            </div>
          </div>

          <div>
            {renderMcqInputs(mcqNumber, "q", userAnswers, handleAnswerChange)}
          </div>
          <Button onClick={submitTest} className="w-full mt-6" size="lg">
            পরীক্ষা জমা দিন
          </Button>
        </div>
      )}

      {view === "answers" && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle /> সঠিক উত্তর নির্বাচন করুন
            </CardTitle>
            <CardDescription>ফলাফল তৈরির জন্য সঠিক উত্তর দিন।</CardDescription>
          </CardHeader>
          <CardContent>
            {renderMcqInputs(
              mcqNumber,
              "correct-q",
              correctAnswers,
              handleCorrectAnswerChange,
              true,
            )}
            <p className="text-red-500 mt-4 text-center">
              জমা দেওয়ার আগে অনুগ্রহ করে সকল প্রশ্নের জন্য সঠিক উত্তর নির্বাচন
              করুন।
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={submitCorrectAnswers} className="w-full" size="lg">
              সঠিক উত্তর জমা দিন
            </Button>
          </CardFooter>
        </Card>
      )}

      {view === "result" && (
        <Card className="animate-fade-in-up">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <BarChart /> পরীক্ষার ফলাফল
            </CardTitle>
            <CardDescription>
              আপনার পরীক্ষার পারফরম্যান্সের সারসংক্ষেপ এখানে।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      মোট প্রশ্ন
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{mcqNumber}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      সঠিক উত্তর
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-500">
                      {resultStats.correctCount}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      ভুল উত্তর
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-red-500">
                      {resultStats.incorrectCount}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      উত্তর দেননি
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {resultStats.skippedCount}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      নেগেটিভ মার্কিং
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold">
                      {resultStats.negativeMark.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      সর্বমোট স্কোর
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">
                      {resultStats.totalScore.toFixed(2)} / {mcqNumber}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="border-2 border-amber-500 bg-amber-100 dark:bg-amber-900/20 p-4 rounded-lg">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  শতাংশ: {resultStats.percentage.toFixed(2)}%
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold my-4">ফলাফল বিশ্লেষণ</h3>
                <div className="max-h-96 overflow-y-auto border rounded-lg">
                  <table className="w-full divide-y divide-border">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold">
                          প্রশ্ন
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">
                          আপনার উত্তর
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">
                          সঠিক উত্তর
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">
                          ফলাফল
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {resultDetails.map((res) => (
                        <tr key={res.q}>
                          <td className="px-4 py-2 font-medium">{res.q}</td>
                          <td
                            className={`px-4 py-2 font-bold ${
                              res.status === "incorrect"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {res.userAnswer}
                          </td>
                          <td className="px-4 py-2 font-bold text-blue-500">
                            {res.correctAnswer}
                          </td>
                          <td className="px-4 py-2">
                            {res.status === "correct" && (
                              <span className="flex items-center gap-1 text-green-500">
                                <Check size={16} /> সঠিক
                              </span>
                            )}
                            {res.status === "incorrect" && (
                              <span className="flex items-center gap-1 text-red-500">
                                <X size={16} /> ভুল
                              </span>
                            )}
                            {res.status === "skipped" && (
                              <span className="text-muted-foreground">
                                স্কিপড
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button onClick={restartTest} className="w-full" size="lg">
              <RotateCcw /> আরেকটি পরীক্ষা শুরু করুন
            </Button>
            <div className="text-center mt-4 p-4 bg-primary/10 rounded-lg w-full">
              <a
                href="https://t.me/admissionnewscorner"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                টেলিগ্রামে আমাদের সাথে যোগ দিন
              </a>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
