
"use client";

import Link from "next/link";
import Image from "next/image";
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
  CalendarCheck,
  Settings,
  Bell,
  LogOut,
  MoreHorizontal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NotificationDropdown } from "./notification-dropdown";
import { Button } from "../ui/button";
import { useTranslation } from "@/hooks/use-language-font";

const navItemsContent = {
  farmer: [
      { href: "/dashboard", labelKey: "dashboard", defaultLabel: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/slot-history", labelKey: "slot_history", defaultLabel: "Slot History", icon: CalendarCheck },
      { isNotification: true, labelKey: "notifications", defaultLabel: "Notifications", icon: Bell },
      { isProfile: true, labelKey: "profile", defaultLabel: "Profile", icon: User },
  ],
  dealer: [
      { href: "/dashboard", labelKey: "marketplace", defaultLabel: "Marketplace", icon: ShoppingBag },
      { href: "/dashboard/orders", labelKey: "my_orders", defaultLabel: "My Orders", icon: Package },
      { isNotification: true, labelKey: "notifications", defaultLabel: "Notifications", icon: Bell },
      { isProfile: true, labelKey: "profile", defaultLabel: "Profile", icon: User },
  ],
  "green-guardian": [
      { href: "/dashboard", labelKey: "warehouse_overview", defaultLabel: "Warehouse Overview", icon: Warehouse },
      { href: "/dashboard/inventory", labelKey: "inventory", defaultLabel: "Inventory", icon: Package },
      { href: "/dashboard/slot-management", labelKey: "slot_management", defaultLabel: "Slot Management", icon: CalendarCheck },
      { href: "/dashboard/route-optimization", labelKey: "logistics", defaultLabel: "Logistics", icon: Truck },
      { href: "/dashboard/alerts", labelKey: "alerts", defaultLabel: "Alerts", icon: Bell },
      { href: "/dashboard/analytics", labelKey: "analytics", defaultLabel: "Analytics", icon: LineChart },
      { isNotification: true, labelKey: "notifications", defaultLabel: "Notifications", icon: Bell },
      { isProfile: true, labelKey: "profile", defaultLabel: "Profile", icon: User },
  ],
  logistics: [
      { href: "/dashboard", labelKey: "logistics_overview", defaultLabel: "Logistics Overview", icon: Truck },
      { href: "/dashboard/route-optimization", labelKey: "route_optimization", defaultLabel: "Route Optimization", icon: Map },
      { href: "/dashboard/delivery-tracking", labelKey: "delivery_tracking", defaultLabel: "Delivery Tracking", icon: Package },
      { isNotification: true, labelKey: "notifications", defaultLabel: "Notifications", icon: Bell },
      { isProfile: true, labelKey: "profile", defaultLabel: "Profile", icon: User },
  ],
  admin: [
      { href: "/dashboard", labelKey: "overview", defaultLabel: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/users", labelKey: "user_management", defaultLabel: "User Management", icon: Users },
      { href: "/dashboard/transactions", labelKey: "transactions", defaultLabel: "Transactions", icon: Handshake },
      { href: "/dashboard/platform_analytics", defaultLabel: "Platform Analytics", icon: LineChart },
      { isNotification: true, labelKey: "notifications", defaultLabel: "Notifications", icon: Bell },
      { isProfile: true, labelKey: "profile", defaultLabel: "Profile", icon: User },
  ],
};

const roleNameKeys = {
  farmer: "Farmer",
  dealer: "Dealer",
  admin: "Admin",
  "green-guardian": "Warehouse Manager",
  logistics: "Logistics",
};

function getRoleName(role: Role, t: (key: string, defaultValue: string) => string) {
  const roleKey = role.replace(/-/g, '_');
  const defaultName = roleNameKeys[role] || "User";
  return t(roleKey, defaultName);
}

export function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang, t } = useTranslation();
  const role = (searchParams.get("role") as Role) || "farmer";

  const currentNavItems = navItemsContent[role] || navItemsContent.farmer;
  const roleQuery = `?role=${role}&lang=${lang}`;
  const currentRoleName = getRoleName(role, t);

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-center p-0">
          <Image src="https://i.ibb.co/cXtXWVTv/logo-main.png" alt="eAaharSetu Logo" width={220} height={75} />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {currentNavItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              {item.isNotification ? (
                <NotificationDropdown isSidebarItem={true} />
              ) : item.isProfile ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <User />
                            <span>{t(item.labelKey, item.defaultLabel)}</span>
                            <MoreHorizontal className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex items-center gap-3">
                           <Avatar className="h-10 w-10">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${role}`} alt="User avatar" />
                              <AvatarFallback>
                              {currentRoleName.charAt(0)}
                              </AvatarFallback>
                           </Avatar>
                           <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {currentRoleName}
                              </p>
                              <p className="text-xs leading-none text-muted-foreground">
                                {role}@eaaharsetu.com
                              </p>
                           </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/profile${roleQuery}`}>
                          <User className="mr-2 h-4 w-4" />
                          <span>{t("profile", "Profile")}</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/settings${roleQuery}`}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>{t("settings", "Settings")}</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>{t("logout", "Log out")}</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: t(item.labelKey, item.defaultLabel) }}
                >
                  <Link 
                    href={`${item.href}${roleQuery}`}
                  >
                    <item.icon />
                    <span>{t(item.labelKey, item.defaultLabel)}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
            {role === 'farmer' && (
                 <div className="mt-4 p-2">
                    <p className="text-xs text-muted-foreground px-2">{t("total_revenue", "Total Revenue")}</p>
                    <p className="text-lg font-semibold px-2">₹1,25,430</p>
                </div>
            )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-3 rounded-md p-3 bg-muted/50">
           <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${role}`} alt="User avatar" />
                  <AvatarFallback>
                  {currentRoleName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="text-sm font-medium leading-none">
                    {currentRoleName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                    {role}@eaaharsetu.com
                    </p>                    
                </div>
              </div>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
