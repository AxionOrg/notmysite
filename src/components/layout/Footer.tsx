"use client";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Home,
  User,
  Info,
  Mail,
  Send,
  Github,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { allData } from "@/lib/data";

const icons: { [key: string]: React.ElementType } = {
  ArrowRight,
  Home,
  User,
  Info,
  Mail,
};

export default function Footer() {
  const { importantLinks, shortcuts } = allData.footer;

  const socialLinks = [
    {
      href: "https://mnr.world",
      label: "Website",
      icon: Globe,
    },
    {
      href: "mailto:mail@mnr.world",
      label: "Mail",
      icon: Mail,
    },
    {
      href: "https://t.me/MNRfrom2020",
      label: "Telegram",
      icon: Send,
    },
    {
      href: "https://facebook.com/MNRfrom2020",
      label: "Facebook",
      icon: Facebook,
    },
    {
      href: "https://youtube.com/@MNRfrom2020",
      label: "Youtube",
      icon: Youtube,
    },
    {
      href: "https://x.com/MNRfrom2020",
      label: "Twitter",
      icon: Twitter,
    },
    {
      href: "https://instagram.com/MNRfrom2020",
      label: "Instagram",
      icon: Instagram,
    },
    {
      href: "https://github.com/MNRfrom2020",
      label: "Github",
      icon: Github,
    },
  ];

  return (
    <footer className="w-full mt-16 mb-2 sm:mb-4">
      <div className="bg-card/50 rounded-2xl shadow-lg px-4 sm:px-8 py-8 border border-border mx-2 sm:mx-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <Link
              href="https://mnr.world"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 mb-4 w-fit"
            >
              <Image
                src="/logo.svg"
                alt="Study Platform Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold">
                <span className="text-primary">Study</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-bengali max-w-sm">
              বাংলাদেশের সকল বিশ্ববিদ্যালয়, কলেজ ও ভর্তি পরীক্ষার তথ্য ও
              সহায়তার জন্য আপনার বিশ্বস্ত প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center space-x-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-transform hover:scale-115"
                    aria-label={social.label}
                  >
                    <Icon />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="text-xl font-semibold inline-block font-bengali relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-blue-500">
              গুরুত্বপূর্ণ লিঙ্ক
            </h2>
            <ul className="mt-4 space-y-3 font-bengali">
              {importantLinks.map((link, index) => {
                const Icon = icons[link.icon];
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <Icon className="text-primary mr-2 h-5 w-5" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-span-1">
            <h2 className="text-xl font-semibold inline-block font-bengali relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-blue-500">
              শর্টকাট
            </h2>
            <ul className="mt-4 space-y-3 font-bengali">
              {shortcuts.map((link, index) => {
                const Icon = icons[link.icon];
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <Icon className="w-5 text-center mr-2" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
