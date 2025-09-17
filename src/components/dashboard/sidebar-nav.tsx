
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
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/language-context";

const navItemsContent = {
    en: {
        farmer: [
            { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { href: "/dashboard/profile", label: "My Profile", icon: User },
            { href: "/dashboard/slot-history", label: "Slot History", icon: CalendarCheck },
        ],
        dealer: [
            { href: "/dashboard", label: "Marketplace", icon: ShoppingBag },
            { href: "/dashboard/orders", label: "My Orders", icon: Package },
            { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
        ],
        "green-guardian": [
            { href: "/dashboard", label: "Warehouse Overview", icon: Warehouse },
            { href: "/dashboard/inventory", label: "Inventory", icon: Package },
            { href: "/dashboard/slot-management", label: "Slot Management", icon: CalendarCheck },
            { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
            { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
            { href: "/dashboard/profile", label: "My Profile", icon: User },
            { href: "/dashboard/settings", label: "Settings", icon: Settings },
            { href: "/dashboard/route-optimization", label: "Logistics", icon: Truck },
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
        roles: {
            farmer: "Farmer",
            dealer: "Dealer",
            admin: "Admin",
            "green-guardian": "Warehouse Manager",
            logistics: "Logistics",
        },
        totalRevenue: "Total Revenue",
    },
    hi: {
        farmer: [
            { href: "/dashboard", label: "डैशबोर्ड", icon: LayoutDashboard },
            { href: "/dashboard/profile", label: "मेरी प्रोफाइल", icon: User },
            { href: "/dashboard/slot-history", label: "स्लॉट इतिहास", icon: CalendarCheck },
        ],
        dealer: [
            { href: "/dashboard", label: "बाजार", icon: ShoppingBag },
            { href: "/dashboard/orders", label: "मेरे आदेश", icon: Package },
            { href: "/dashboard/analytics", label: "एनालिटिक्स", icon: LineChart },
        ],
        "green-guardian": [
            { href: "/dashboard", label: "गोदाम अवलोकन", icon: Warehouse },
            { href: "/dashboard/inventory", label: "इन्वेंटरी", icon: Package },
            { href: "/dashboard/slot-management", label: "स्लॉट प्रबंधन", icon: CalendarCheck },
            { href: "/dashboard/alerts", label: "अलर्ट", icon: Bell },
            { href: "/dashboard/analytics", label: "एनालिटिक्स", icon: LineChart },
            { href: "/dashboard/profile", label: "मेरी प्रोफाइल", icon: User },
            { href: "/dashboard/settings", label: "सेटिंग्स", icon: Settings },
            { href: "/dashboard/route-optimization", label: "रसद", icon: Truck },
        ],
        logistics: [
            { href: "/dashboard", label: "रसद अवलोकन", icon: Truck },
            { href: "/dashboard/route-optimization", label: "मार्ग अनुकूलन", icon: Map },
            { href: "/dashboard/delivery-tracking", label: "वितरण ट्रैकिंग", icon: Package },
        ],
        admin: [
            { href: "/dashboard", label: "अवलोकन", icon: LayoutDashboard },
            { href: "/dashboard/users", label: "उपयोगकर्ता प्रबंधन", icon: Users },
            { href: "/dashboard/transactions", label: "लेन-देन", icon: Handshake },
            { href: "/dashboard/platform-analytics", label: "प्लेटफ़ॉर्म एनालिटिक्स", icon: LineChart },
        ],
        roles: {
            farmer: "किसान",
            dealer: "व्यापारी",
            admin: "व्यवस्थापक",
            "green-guardian": "गोदाम प्रबंधक",
            logistics: "रसद",
        },
        totalRevenue: "कुल राजस्व",
    }
}


function getRoleName(role: Role, lang: 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta') {
  const supportedLang = (['en', 'hi'].includes(lang as string)) ? lang as 'en' | 'hi' : 'en';
  return navItemsContent[supportedLang].roles[role] || navItemsContent.en.roles[role];
}

export function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useContext(LanguageContext);
  const role = (searchParams.get("role") as Role) || "farmer";
  const supportedLang = (['en', 'hi'].includes(lang as string)) ? lang as 'en' | 'hi' : 'en';
  const t = navItemsContent[supportedLang];

  const currentNavItems = t[role] || navItemsContent.en[role];
  const roleQuery = `?role=${role}&lang=${lang}`;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src="https://i.ibb.co/cXtXWVTv/logo-main.png" alt="eAaharSetu Logo" width={32} height={32} />
          <span className="text-xl font-semibold">eAaharSetu</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {currentNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link 
                  href={`${item.href}${roleQuery}`}
                  onClick={(e) => {
                    console.log('Navigation clicked:', `${item.href}${roleQuery}`);
                  }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
            {role === 'farmer' && (
                 <div className="mt-4 p-2">
                    <p className="text-xs text-muted-foreground px-2">{t.totalRevenue}</p>
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
                        {getRoleName(role, lang).charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium leading-none">
                        {getRoleName(role, lang)}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {role}@eaaharsetu.com
                        </p>                    </div>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
