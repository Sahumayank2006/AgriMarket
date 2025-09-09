
"use client";

import { Suspense, useContext, useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Header } from "@/components/dashboard/header";
import { useSearchParams } from "next/navigation";
import { LanguageContext } from "@/contexts/language-context";
import type { LangKey } from "@/contexts/language-context";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { setLang } = useContext(LanguageContext);

  useEffect(() => {
    const lang = searchParams.get("lang") as LangKey;
    if (lang) {
      setLang(lang);
    }
  }, [searchParams, setLang]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <Suspense>
            <SidebarNav />
          </Suspense>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <Suspense>
            <Header />
          </Suspense>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Suspense fallback={<div>Loading page...</div>}>
              {children}
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
