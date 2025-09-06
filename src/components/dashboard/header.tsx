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
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold">{getRoleName(role)} Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${role}`} alt="User avatar" />
                <AvatarFallback>
                  {getRoleName(role).charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {getRoleName(role)}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {role}@agrimarket.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
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
