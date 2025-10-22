"use client";
import Image from "next/image";
import Link from "next/link";
import { allData } from "@/lib/data";
import React, { useState, useEffect } from "react";

interface Feature {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface HomePageClientProps {
  features: Feature[];
}

const useTypingAnimation = ({
  phrases,
  typingSpeed = 150,
  deletingSpeed = 75,
  delay = 2000,
}: {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (phrases.length === 0) return;

    const currentPhrase = phrases[index % phrases.length];

    if (isDeleting) {
      if (subIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
        return;
      }
      const timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, subIndex - 1));
        setSubIndex(subIndex - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else {
      if (subIndex === currentPhrase.length) {
        const timeout = setTimeout(() => setIsDeleting(true), delay);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, subIndex + 1));
        setSubIndex(subIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [subIndex, index, isDeleting, phrases, typingSpeed, deletingSpeed, delay]);

  return text;
};

const TypingAnimation = () => {
  const phrases = [
    "একাডেমিক হোক,",
    "এডমিশন হোক,",
    "অথবা বেসিক গড়ার প্রচেষ্টা,",
  ];
  const text = useTypingAnimation({ phrases });

  return (
    <div className="h-12 md:h-14 lg:h-7 flex items-center justify-center font-bengali">
      <h1 className="text-lg text-muted-foreground">
        <span className="typing-animation">{text}</span>
        <span className="animate-blink-caret border-r-2 border-primary"></span>
      </h1>
    </div>
  );
};

const HomePageClient = ({ features }: HomePageClientProps) => {
  const studyPlatformImage = allData.placeholderImages.find(
    (p) => p.id === "study-platform",
  );
  const characterImage = allData.placeholderImages.find(
    (p) => p.id === "study-platform-character",
  );
  const characterImage2 = allData.placeholderImages.find(
    (p) => p.id === "study-platform-character-2",
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-10">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-bengali gradient-text md:leading-tight">
            স্বপ্ন পূরণের পথে, সকল কিছু একসাথে
          </h1>
          <div className="mt-4">
            <TypingAnimation />
            <p className="text-lg text-muted-foreground font-bengali">
              সকল কিছুর জন্যে পাশে আছে{" "}
              <b className="text-primary">“MNR Study”</b>
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {features.map((feature) => (
              <Link
                href={feature.href}
                key={feature.href}
                aria-label={feature.label}
              >
                <div className="feature-card dark:hover:bg-accent">
                  {feature.icon}
                  <p className="font-bengali font-semibold text-sm sm:text-base text-card-foreground">
                    {feature.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center relative max-w-md w-full h-auto mx-auto aspect-square">
          {characterImage && (
            <div className="absolute inset-0 z-0 animate-float">
              <Image
                src={characterImage.imageUrl}
                alt={characterImage.description}
                fill
                className="object-contain"
                priority
                fetchPriority="high"
              />
            </div>
          )}
          {studyPlatformImage && (
            <div className="relative z-10 w-full h-full">
              <Image
                src={studyPlatformImage.imageUrl}
                alt={studyPlatformImage.description}
                fill
                className="object-contain"
                priority
                fetchPriority="high"
              />
            </div>
          )}
          {characterImage2 && (
            <div className="absolute inset-0 z-20 animate-float [animation-direction:reverse]">
              <Image
                src={characterImage2.imageUrl}
                alt={characterImage2.description}
                fill
                className="object-contain"
                priority
                fetchPriority="high"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageClient;
