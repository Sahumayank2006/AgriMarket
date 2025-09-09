
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Carrot,
  Handshake,
  HeartHandshake,
  LayoutDashboard,
  Leaf,
  Library,
  LineChart,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Warehouse,
  Truck,
  Map,
  User,
  Store,
  Lightbulb,
  Landmark,
} from "lucide-react";

import { Logo } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navItems = {
  farmer: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
  ],
  dealer: [
    { href: "/dashboard", label: "Marketplace", icon: ShoppingBag },
    { href: "/dashboard/orders", label: "My Orders", icon: Package },
    { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  ],
  "green-guardian": [
    { href: "/dashboard", label: "Warehouse Overview", icon: Warehouse },
    { href: "/dashboard/inventory", label: "Inventory", icon: Package },
    { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  ],
  logistics: [
    { href: "/dashboard", label: "Logistics Overview", icon: Truck },
    { href: "/dashboard/route-optimization", label: "Route Optimization", icon: Map },
    { href: "/dashboard/delivery-tracking", label: "Delivery Tracking", icon: Package },
  ],
  admin: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "User Management", icon: Users },
    { href: "/dashboard/transactions", label: "Transactions", icon: Handshake },
    { href: "/dashboard/platform-analytics", label: "Platform Analytics", icon: LineChart },
  ],
};


function getRoleName(role: Role) {
  const names: Record<Role, string> = {
    farmer: "Farmer",
    dealer: "Dealer",
    admin: "Admin",
    "green-guardian": "Warehouse Manager",
    logistics: "Logistics",
  };
  return names[role];
}

export function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = (searchParams.get("role") as Role) || "farmer";
  const currentNavItems = navItems[role] || [];
  const roleQuery = `?role=${role}`;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">AaharSetu</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {currentNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={`${item.href}${roleQuery}`}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
            {role === 'farmer' && (
                 <div className="mt-4 p-2">
                    <p className="text-xs text-muted-foreground px-2">Total Revenue</p>
                    <p className="text-lg font-semibold px-2">₹1,25,430</p>
                </div>
            )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-3 rounded-md p-3 bg-muted/50">
           <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${role}`} alt="User avatar" />
                        <AvatarFallback>
                        {getRoleName(role).charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium leading-none">
                        {getRoleName(role)}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {role}@aaharsetu.com
                        </p>                    </div>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
