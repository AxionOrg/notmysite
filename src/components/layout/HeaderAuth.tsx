"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LogIn, UserCircle } from "lucide-react";
import { useUser } from "@/lib/supabase/hooks";
import { useSupabase } from "@/lib/supabase/hooks";
import { useState } from "react";

interface AuthButtonProps {
  isHovered: boolean;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isDestructive?: boolean;
}

function AuthButton({
  isHovered,
  label,
  icon,
  onClick,
  isDestructive = false,
}: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-full transition-colors duration-300",
        "h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "text-muted-foreground",
        "px-3 font-bengali",
        isHovered &&
          (isDestructive
            ? "bg-destructive/10 text-destructive"
            : "bg-accent text-accent-foreground"),
      )}
    >
      <div className="relative z-10 flex items-center">
        <div className="shrink-0">{icon}</div>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxWidth: isHovered ? "100px" : "0",
            marginLeft: isHovered ? "0.5rem" : "0",
          }}
        >
          <span className="whitespace-nowrap text-sm font-medium truncate">
            {label}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function HeaderAuth() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { user, loading } = useUser();
  const supabase = useSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <div className="h-9 w-20 rounded-full bg-muted animate-pulse" />;
  }

  const profileIcon = user?.user_metadata?.avatar_url ? (
    <Image
      src={user.user_metadata.avatar_url}
      alt={user.user_metadata?.full_name || "Profile"}
      width={24}
      height={24}
      className="rounded-full"
    />
  ) : (
    <UserCircle size={20} />
  );

  return (
    <div onMouseLeave={() => setHoveredId(null)}>
      {user ? (
        <div
          className="flex items-center gap-x-1"
          onMouseEnter={() => setHoveredId("profile")}
        >
          <Link href="/profile">
            <AuthButton
              isHovered={hoveredId === "profile"}
              label={
                user.user_metadata?.full_name ||
                (user.is_anonymous ? "অতিথি" : "প্রোফাইল")
              }
              icon={profileIcon}
            />
          </Link>
        </div>
      ) : (
        <Link href="/login" onMouseEnter={() => setHoveredId("login")}>
          <AuthButton
            isHovered={hoveredId === "login"}
            label="লগইন"
            icon={<LogIn size={20} />}
          />
        </Link>
      )}
    </div>
  );
}
