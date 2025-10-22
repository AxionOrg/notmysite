"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  ShieldCheck,
  LogOut,
  UserCircle,
  Save,
  Trash2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CalendarDays,
  Bookmark,
  Copy,
  Check,
  BookOpen,
  FilePenLine,
} from "lucide-react";
import Link from "next/link";
import { useUser, useSupabase } from "@/lib/supabase/hooks";
import { User } from "@supabase/supabase-js";
import FavoriteExamsCalendar from "@/components/FavoriteExamsCalendar";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookmarkedSubjects from "@/components/BookmarkedSubjects";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

const suggestions = [
  {
    title: "ঢাকা বিশ্ববিদ্যালয় প্রশ্নব্যাংক",
    href: "/question-bank?tab=du",
    icon: BookOpen,
  },
  {
    title: "অ্যাডমিশন ক্যালেন্ডার দেখুন",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "OMR সেলফ টেস্ট",
    href: "/self-test",
    icon: FilePenLine,
  },
];

const getCreationTime = (user: User | null) => {
  if (user?.created_at) {
    return format(new Date(user.created_at), "PPp", { locale: bn });
  }
  return "N/A";
};

function RegisteredUserProfile() {
  const { user } = useUser();
  const supabase = useSupabase();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(
    user?.user_metadata?.full_name ||
      user?.user_metadata?.user_name ||
      "ব্যবহারকারী",
  );
  const [saving, setSaving] = useState(false);

  const handleProfileUpdate = async () => {
    if (!user || !supabase) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "প্রোফাইল আপডেট ব্যর্থ হয়েছে",
        description: error.message,
      });
    } else {
      toast({
        title: "প্রোফাইল সফলভাবে আপডেট হয়েছে",
      });
    }
    setSaving(false);
  };

  if (!user || user.is_anonymous) {
    return null;
  }

  return (
    <>
      <Card className="w-full p-4 sm:p-6 text-center shadow-lg animate-fade-in-up mb-8">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative h-24 w-24">
              {user?.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={displayName}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              ) : (
                <UserCircle className="h-24 w-24 text-primary" />
              )}
              <ShieldCheck className="absolute bottom-1 right-1 h-8 w-8 text-green-500 bg-card rounded-full p-1" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            স্বাগতম, {displayName}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base pt-1">
            আপনার প্রোফাইল এবং অ্যাকাউন্ট পরিচালনা করুন।
          </CardDescription>
        </CardHeader>
      </Card>
      <Card
        className="shadow-lg animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        <CardHeader>
          <CardTitle>প্রোফাইল তথ্য</CardTitle>
          <CardDescription>
            আপনার ব্যক্তিগত তথ্য এখানে আপডেট করুন।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">আপনার নাম</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="আপনার পুরো নাম"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleProfileUpdate}
            disabled={saving}
            className="w-full"
          >
            <Save className="mr-2" />
            {saving ? "সেভ হচ্ছে..." : "তথ্য সেভ করুন"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

function AnonymousUserProfile() {
  const [displayName, setDisplayName] = useState("অতিথি");

  useEffect(() => {
    const localName = localStorage.getItem("anonymousDisplayName");
    if (localName) {
      setDisplayName(localName);
    }
  }, []);

  return (
    <>
      <Card className="w-full p-4 sm:p-6 text-center shadow-lg animate-fade-in-up mb-8">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative h-24 w-24">
              <UserCircle className="h-24 w-24 text-primary" />
              <ShieldCheck className="absolute bottom-1 right-1 h-8 w-8 text-yellow-500 bg-card rounded-full p-1" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            স্বাগতম, {displayName}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base pt-1">
            আপনি একজন অতিথি হিসেবে লগইন করেছেন।
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}

export default function ProfilePage() {
  const { user, loading } = useUser();
  const supabase = useSupabase();
  const router = useRouter();
  const { toast } = useToast();
  const [copied, copy] = useCopyToClipboard();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        toast({ title: "আইডি কপি হয়েছে!" });
      })
      .catch(() => {
        toast({ variant: "destructive", title: "কপি করতে সমস্যা হয়েছে" });
      });
  };

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    if (!user || user.is_anonymous || !supabase) return;
    if (
      !window.confirm(
        "আপনি কি নিশ্চিতভাবে আপনার অ্যাকাউন্ট মুছে ফেলতে চান? এই কাজটি আর ফেরানো যাবে না।",
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase.rpc("delete_user");
      if (error) throw error;
      await supabase.auth.signOut();
      toast({
        title: "অ্যাকাউন্ট মুছে ফেলা হয়েছে",
        description: "আপনার অ্যাকাউন্ট এবং ডেটা স্থায়ীভাবে মুছে ফেলা হয়েছে।",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "একটি সমস্যা হয়েছে",
        description:
          error.message || "অ্যাকাউন্ট মুছে ফেলার সময় একটি সমস্যা হয়েছে।",
      });
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center font-bengali">
          <p className="text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const isAnonymous = user.is_anonymous;

  return (
    <div className="container mx-auto px-2 py-8 max-w-2xl font-bengali">
      {isAnonymous ? <AnonymousUserProfile /> : <RegisteredUserProfile />}

      <Tabs
        defaultValue="calendar"
        className="w-full my-8 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">
            <CalendarDays className="mr-2" /> ক্যালেন্ডার
          </TabsTrigger>
          <TabsTrigger value="bookmarks">
            <Bookmark className="mr-2" /> বুকমার্ক
          </TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <Card className="shadow-lg mt-2">
            <CardHeader>
              <CardTitle>আপনার পরীক্ষার ক্যালেন্ডার</CardTitle>
              <CardDescription>
                ক্যালেন্ডারে আপনার পছন্দের পরীক্ষার তারিখগুলো হাইলাইট করা আছে।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FavoriteExamsCalendar />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookmarks">
          <Card className="shadow-lg mt-2">
            <CardHeader>
              <CardTitle>বুকমার্ক করা বিষয়সমূহ</CardTitle>
              <CardDescription>
                আপনার পছন্দের বিষয়গুলো এখানে দেখানো হচ্ছে।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookmarkedSubjects />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card
        className="my-8 shadow-lg animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            <CardTitle>আপনার জন্য প্রস্তাবিত</CardTitle>
          </div>
          <CardDescription>
            আপনার আগ্রহের উপর ভিত্তি করে কিছু গুরুত্বপূর্ণ লিংক।
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <Button
                key={suggestion.href}
                asChild
                variant="outline"
                className="justify-between items-center"
              >
                <Link
                  href={suggestion.href}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Icon />
                    <span className="truncate">{suggestion.title}</span>
                  </div>
                  <ArrowRight className="ml-2 flex-shrink-0" />
                </Link>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      <div
        className="grid grid-cols-1 gap-8 animate-fade-in-up"
        style={{ animationDelay: "400ms" }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>ডিভাইস ও সেশন</CardTitle>
            <CardDescription>আপনার বর্তমান লগইন সেশনের তথ্য</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <span className="font-medium text-muted-foreground">
                প্রোভাইডার:
              </span>{" "}
              <span className="font-mono text-primary text-xs break-all">
                {user.is_anonymous
                  ? "অতিথি"
                  : user.app_metadata.provider?.replace(".com", "") || "অজানা"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium text-muted-foreground">
                ডিভাইস আইডি:
              </span>{" "}
              <span className="font-mono text-primary text-xs break-all">
                {user.id}
              </span>
              <button onClick={() => handleCopy(user.id)} title="কপি করুন">
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                )}
              </button>
            </p>
            <p>
              <span className="font-medium text-muted-foreground">
                লগইন সময়:
              </span>{" "}
              {getCreationTime(user)}
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={logout} variant="outline" className="w-full">
              <LogOut className="mr-2" />
              লগ আউট
            </Button>
          </CardFooter>
        </Card>
      </div>

      {!isAnonymous && (
        <Card
          className="mt-8 shadow-lg border-destructive/50 bg-destructive/5 animate-fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-destructive h-6 w-6" />
              <CardTitle className="text-destructive">ডেঞ্জার জোন</CardTitle>
            </div>
            <CardDescription className="text-destructive/80">
              এই সেকশনের কাজগুলো অপরিবর্তনীয়। অনুগ্রহ করে সতর্কতার সাথে ব্যবহার
              করুন।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left p-4 border border-destructive/20 rounded-lg gap-4">
              <div>
                <h4 className="font-bold">অ্যাকাউন্ট মুছুন</h4>
                <p className="text-sm text-muted-foreground">
                  আপনার সমস্ত ডেটা স্থায়ীভাবে মুছে ফেলা হবে।
                </p>
              </div>
              <Button
                onClick={handleDeleteAccount}
                variant="destructive"
                className="w-full sm:w-auto"
              >
                <Trash2 className="mr-2" />
                অ্যাকাউন্ট মুছুন
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
