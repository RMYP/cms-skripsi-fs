"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function AppSidebar({ className, items, ...props }: SidebarNavProps) {
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <nav
      className={`flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 gap-2 ps-2 ${className}`}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            path == item.href
              ? "bg-muted hover:bg-muted text-lg ps-4 rounded-sm py-1"
              : "hover:bg-transparent hover:underline text-lg ps-4 py-1"
          }
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
