
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
    { href: "/dashboard/crop-management", label: "Crop Management", icon: Carrot },
    { href: "/dashboard/market-participation", label: "Marketplace", icon: Store },
    { href: "/dashboard/transport", label: "Transport", icon: Truck },
    { href: "/dashboard/advisory", label: "Advisory", icon: Lightbulb },
    { href: "/dashboard/financial-services", label: "Financial Services", icon: Landmark },
    { href: "/dashboard/inventory", label: "Your Inventory", icon: Package },
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
      <SidebarHeader className="github-border border-b bg-white dark:bg-gray-950">
        <div className="flex items-center gap-2 p-4">
          <Logo className="h-8 w-8 text-primary-500" />
          <span className="text-lg font-medium">AgriMarket</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2 bg-gray-50 dark:bg-gray-900">
        <SidebarMenu>
          {currentNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={`${item.href}${roleQuery}`}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                  className="font-medium hover:bg-white dark:hover:bg-gray-800 hover:github-shadow transition-all duration-200 data-[active=true]:bg-primary-50 dark:data-[active=true]:bg-primary-900/20 data-[active=true]:text-primary-600 dark:data-[active=true]:text-primary-400"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
            {role === 'farmer' && (
                 <div className="mt-4 p-3 mx-2 bg-white dark:bg-gray-950 rounded github-border github-shadow">
                    <p className="text-xs font-light text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <p className="text-lg font-medium metric text-gray-900 dark:text-gray-100">₹1,25,430</p>
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
                        {role}@agrimarket.com
                        </p>
                    </div>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
