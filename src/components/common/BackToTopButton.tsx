"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={scrollToTop}
        size="icon"
        aria-label="উপরে যান"
        className={cn(
          "rounded-full shadow-lg h-12 w-12 bg-primary/90 text-primary-foreground backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300",
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-80 translate-y-5 pointer-events-none",
        )}
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default BackToTopButton;
