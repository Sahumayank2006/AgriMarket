import { Suspense } from "react";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Header } from "@/components/dashboard/header";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
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
