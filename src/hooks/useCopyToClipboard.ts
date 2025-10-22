"use client";

import { useState } from "react";
import { useToast } from "./use-toast";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [boolean, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      toast({
        variant: "destructive",
        title: "ক্লিপবোর্ড এভেইলেবল নয়",
        description: "আপনার ব্রাউজার এই ফিচারটি সাপোর্ট করে না।",
      });
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Reset after 2 seconds
      return true;
    } catch (error) {
      setCopiedText(null);
      setIsCopied(false);
      return false;
    }
  };

  return [isCopied, copy];
}
