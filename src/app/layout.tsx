import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/common/BackToTopButton";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SupabaseProvider } from "@/lib/supabase/provider";

export const metadata: Metadata = {
  title: "MNR Study — Your Study Partner",
  description: "Your central hub for university information.",
  keywords: [
    "mnr",
    "mnr world",
    "mnrfrom2020",
    "frostfoe",
    "mnr study",
    "study platform",
    "admission calendar",
    "admission news 2025",
    "admission 2025",
    "university admission",
    "question bank",
    "bangladesh university",
    "public university",
    "private university",
    "college admission",
    "ভর্তি তথ্য",
    "বিশ্ববিদ্যালয় ভর্তি",
    "প্রশ্নব্যাংক",
    "অ্যাডমিশন ক্যালেন্ডার",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/css/hind-siliguri.css" />
        <link
          rel="preconnect"
          href="https://raw.githubusercontent.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn("min-h-screen flex flex-col antialiased font-sans")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <Header />
            <main className="flex-grow pt-6">{children}</main>
            <Footer />
            <BackToTopButton />
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
