
"use client";

import { useSearchParams } from "next/navigation";
import {
  Bell,
  Home,
  Languages,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import type { Role } from "@/lib/types";
import { LanguageContext, content } from "@/contexts/language-context";
import type { LangKey } from "@/contexts/language-context";
import { NotificationDropdown } from "./notification-dropdown";

function getRoleName(role: Role | null, lang: 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta') {
  const supportedLang = (['en', 'hi'].includes(lang as string)) ? lang as 'en' | 'hi' : 'en';
  if (!role) return lang === 'en' ? "User" : "उपयोगकर्ता";
  
  const names = {
    en: {
      farmer: "Farmer",
      dealer: "Dealer",
      admin: "Admin",
      "green-guardian": "Warehouse Manager",
      logistics: "Logistics",
    },
    hi: {
      farmer: "किसान",
      dealer: "व्यापारी",
      admin: "व्यवस्थापक",
      "green-guardian": "गोदाम प्रबंधक",
      logistics: "रसद",
    }
  };
  return names[supportedLang][role];
}

export function Header() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role | null>(null);
  const { lang, setLang } = useContext(LanguageContext);
  const t = content[lang];

  useEffect(() => {
    const newRole = searchParams.get("role") as Role | null;
    setRole(newRole);
  }, [searchParams]);
  
  const currentRoleName = getRoleName(role, lang);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-header text-header-foreground px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-xl font-semibold text-center">{currentRoleName} {t.dashboardTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-blue-500 border-2 text-white bg-transparent hover:bg-white/10 hover:text-white">
              <Languages className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
              <span className="text-xs">{content[lang].langName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('hi')}>हिंदी</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('bn')}>বাংলা</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('te')}>తెలుగు</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('mr')}>मराठी</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('ta')}>தமிழ்</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
