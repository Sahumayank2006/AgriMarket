"use client";

import { useSearchParams } from "next/navigation";
import {
  Bell,
  Home,
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
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Role } from "@/lib/types";

function getRoleName(role: Role | null) {
  if (!role) return "User";
  const names: Record<Role, string> = {
    farmer: "Farmer",
    dealer: "Dealer",
    admin: "Admin",
    "green-guardian": "Warehouse Manager",
    logistics: "Logistics",
  };
  return names[role];
}

export function Header() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    setRole(searchParams.get("role") as Role | null);
  }, [searchParams]);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between github-border border-b bg-white/95 dark:bg-gray-950/95 px-4 backdrop-blur-sm github-shadow sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">{getRoleName(role)} Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Avatar className="h-9 w-9 github-border">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${role}`} alt="User avatar" />
                <AvatarFallback className="font-medium text-sm">
                  {getRoleName(role).charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 github-border github-shadow-lg bg-white dark:bg-gray-950" align="end" forceMount>
            <DropdownMenuLabel className="font-light">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {getRoleName(role)}
                </p>
                <p className="text-xs leading-none font-light text-gray-600 dark:text-gray-400">
                  {role}@agrimarket.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            <DropdownMenuItem className="font-light hover:bg-gray-100 dark:hover:bg-gray-800">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-light hover:bg-gray-100 dark:hover:bg-gray-800">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            <DropdownMenuItem asChild className="font-light hover:bg-gray-100 dark:hover:bg-gray-800">
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
