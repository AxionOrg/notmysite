"use client";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface LinkItem {
  href: string;
  label: string;
  target?: string;
  rel?: string;
  colSpan?: number;
}

interface LinkListProps {
  links: LinkItem[][];
}

const LinkList = ({ links }: LinkListProps) => {
  return (
    <div
      id="Links"
      className="w-full border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-lg text-center relative mt-4"
    >
      <div className="flex justify-center">
        <div className="gradient-background inline-flex items-center gap-2 px-6 py-2 text-primary-foreground rounded-full text-lg mb-4 font-bold shadow-md">
          <LinkIcon className="h-5 w-5" />
          গুরুত্বপূর্ণ লিঙ্ক
        </div>
      </div>
      <Table className="border rounded-md">
        <TableBody>
          {links.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((link, linkIndex) => (
                <TableCell
                  key={linkIndex}
                  className="text-center p-0"
                  colSpan={link.colSpan}
                >
                  <Link
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                    className="block w-full hover:bg-accent rounded-md py-2"
                  >
                    <div
                      className="text-base"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  </Link>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LinkList;
