"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface dataObject {
  title: string;
  href: string;
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string;
    icon: string;
    data: dataObject[];
  }[];
}


export function AppSidebar({ className, items, ...props }: SidebarNavProps) {
  const path = usePathname();

  return (
    <nav
      className={`flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 gap-2 ps-2 ${className}`}
      {...props}
    >
      {items.map((item) => (
        <div key={item.title} className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 gap-2 ps-2">
          <p className="text-lg" >{item.title}</p>
          {item.data.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className={
                path === subItem.href
                  ? "bg-muted hover:bg-muted text-md ps-4 rounded-sm py-1"
                  : "hover:bg-transparent hover:underline text-md ps-4 py-1"
              }
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
