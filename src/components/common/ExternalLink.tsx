"use client";

import { ArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

const ExternalLink = ({
  href,
  text,
  icon,
  className,
  showIcon = true,
}: ExternalLinkProps) => {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "text-primary hover:underline inline-flex items-center gap-1",
        className,
      )}
    >
      {icon}
      <span dangerouslySetInnerHTML={{ __html: text }} />
      {showIcon && <ArrowUpRightFromSquare className="h-3 w-3" />}
    </Link>
  );
};

export default ExternalLink;
