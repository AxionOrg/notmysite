"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { allData } from "@/lib/data/_generated";
import { cn } from "@/lib/utils";
import { UserPen } from "lucide-react";

const QuestionBankCards = () => {
  const questionBankCards = allData.questionBankCards;
  return (
    <>
      {questionBankCards.map((card, index) => (
        <Link href={card.href} key={index}>
          <div
            className={cn(
              "relative w-full h-56 sm:h-64 text-center font-bold rounded-md p-4 flex flex-col justify-between items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border",
              "bg-card hover:border-primary/50",
            )}
          >
            <div>
              <div className="bg-accent dark:bg-[#757575] rounded-full p-2 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-3 shadow-inner mx-auto">
                <Image
                  src={card.logo}
                  alt={`${card.title} logo`}
                  width={50}
                  height={50}
                  className="object-contain w-10 h-10 sm:w-12 sm:h-12"
                />
              </div>
              <h3 className="text-sm sm:text-base text-card-foreground">
                {card.title}
              </h3>
            </div>
            {card.author && (
              <div className="w-full">
                <hr className="my-2 border-border/50" />
                <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1.5 font-normal">
                  <UserPen size={12} />
                  {card.author}
                </p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};

export default QuestionBankCards;
