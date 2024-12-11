import { AppSidebar } from "./components/app-sidebar";
import { Search } from "lucide-react";

import Link from "next/link";
import { Input } from "@/components/ui/input";
const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Setting",
    href: "/setting",
  },
  {
    title: "Logout",
    href: "/logout"
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-zinc-50">
        <nav className="px-5 py-2 mb-4 bg-white shadow-md">
          <div className="flex justify-between item-center container mx-auto">
            <div className="py-3 flex gap-10">
              <Link href="/" className="text-xl">
                Rizki Putra
              </Link>
              <div className="gap-5 flex items-center">
                <Link href="/">Home</Link>
                <Link href="/">Print</Link>
                <Link href="/">Kos</Link>
                <Link href="/">About Us</Link>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center w-full md:w-auto justify-center ml-[1.5rem] md:ml-[3rem]">
                <Input
                  name="search"
                  type="text"
                  className="bg-gray-200 py-2 md:py-5 w-full md:w-[20rem] pe-[3rem]"
                />

                <span className="relative right-8">
                  <Search className="w-5 h-5 text-gray-500" />
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-col pt-4 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 ">
          <aside className="ps-4 lg:w-1/5 bg-white">
            <AppSidebar items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-6xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
