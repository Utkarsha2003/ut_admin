"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/login");

  if (isAuthPage) {
    return <>{children}</>; // No sidebar/header on login
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden md:flex md:w-64">
        <Sidebar />
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
