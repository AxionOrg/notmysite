"use client";

import { Button } from "@/components/ui/button";
import { User, Fingerprint, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/lib/supabase/hooks";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Google</title>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.58 3.18-5.62 3.18-4.91 0-8.89-3.99-8.89-8.89s3.98-8.89 8.89-8.89c2.6 0 4.38 1.05 5.43 2.04l2.5-2.5C18.44 2.33 15.86 1 12.48 1 5.61 1 0 6.6 0 13.5s5.61 12.5 12.48 12.5c7.16 0 12-4.99 12-11.82 0-.79-.07-1.54-.19-2.28z"
    />
  </svg>
);

export default function LoginPage() {
  const supabase = createClient();
  const { user, loading: userLoading } = useUser();
  const [anonymousLoading, setAnonymousLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!userLoading && user) {
      router.push("/profile");
    }
  }, [user, userLoading, router]);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Google লগইন ব্যর্থ হয়েছে",
        description: "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
      setGoogleLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setGithubLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "GitHub লগইন ব্যর্থ হয়েছে",
        description: "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
      setGithubLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setAnonymousLoading(true);
    try {
      const supabaseClient = createClient();
      const { data, error } = await supabaseClient.auth.signInAnonymously();
      if (error) throw error;

      toast({
        title: "অতিথি হিসেবে লগইন সফল হয়েছে",
        description: "আপনার প্রোফাইলে স্বাগতম!",
      });
      router.push("/profile");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "লগইন ব্যর্থ হয়েছে",
        description:
          error.message || "একটি অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setAnonymousLoading(false);
    }
  };

  const isLoading =
    anonymousLoading || githubLoading || googleLoading || userLoading;

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center font-bengali">
          <p className="text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center font-bengali">
          <p className="text-lg">প্রোফাইলে নিয়ে যাওয়া হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] font-bengali px-2">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-lg animate-fade-in-up text-center my-8">
        <CardHeader>
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4 mx-auto w-fit">
            <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
            আপনার অ্যাকাউন্টে লগইন করুন
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            আপনার পছন্দের পদ্ধতিতে লগইন করে আমাদের সাথে যুক্ত হন।
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            size="lg"
            variant="outline"
            className="w-full font-semibold text-base transition-transform hover:scale-105"
            disabled={isLoading}
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            {googleLoading ? "প্রসেসিং..." : "Google দিয়ে লগইন করুন"}
          </Button>
          <Button
            onClick={handleGithubLogin}
            size="lg"
            variant="outline"
            className="w-full font-semibold text-base transition-transform hover:scale-105"
            disabled={isLoading}
          >
            <Github className="mr-2" />
            {githubLoading ? "প্রসেসিং..." : "GitHub দিয়ে লগইন করুন"}
          </Button>
          <Button
            onClick={handleAnonymousLogin}
            size="lg"
            className="w-full font-semibold text-base transition-transform hover:scale-105"
            disabled={isLoading}
          >
            <Fingerprint className="mr-2" />
            {anonymousLoading ? "প্রসেসিং..." : "অতিথি হিসেবে লগইন করুন"}
          </Button>
          <div className="text-xs text-muted-foreground mt-6">
            <p>
              অতিথি হিসেবে লগইন করলে আপনার জন্য একটি অস্থায়ী ও সুরক্ষিত সেশন
              তৈরি করা হবে।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
