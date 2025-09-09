
"use client";

import {
  Bell,
  CheckCircle,
  Package,
  AlertTriangle,
  User,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { useSearchParams } from "next/navigation";
import type { Role } from "@/lib/types";

type NotificationIcon = "CheckCircle" | "Package" | "AlertTriangle" | "User" | "XCircle";

interface Notification {
  id: string;
  icon: NotificationIcon;
  title: string;
  description: string;
  timestamp: Timestamp;
  read: boolean;
  link?: string;
  userId: string;
}

const iconMap: Record<NotificationIcon, React.ReactNode> = {
  CheckCircle: <CheckCircle className="h-4 w-4 text-green-500" />,
  Package: <Package className="h-4 w-4 text-blue-500" />,
  AlertTriangle: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  User: <User className="h-4 w-4 text-purple-500" />,
  XCircle: <XCircle className="h-4 w-4 text-red-500" />,
};


export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as Role | null;

  useEffect(() => {
    // In a real app, you'd get the current user's ID from auth state
    const getCurrentUserId = () => {
        switch(role) {
            case "farmer": return "farmer-rohan";
            case "green-guardian": return "warehouse-manager";
            default: return null;
        }
    }
    
    const userId = getCurrentUserId();

    if (!userId) {
        setNotifications([]);
        return;
    }

    const q = query(
        collection(db, "notifications"), 
        where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedNotifications: Notification[] = [];
        querySnapshot.forEach((doc) => {
            fetchedNotifications.push({ id: doc.id, ...doc.data() } as Notification);
        });
        
        // Sort on the client while index is building
        fetchedNotifications.sort((a, b) => {
            if (a.timestamp && b.timestamp) {
                return b.timestamp.toMillis() - a.timestamp.toMillis()
            }
            return 0;
        });


        setNotifications(fetchedNotifications);
    });

    return () => unsubscribe();
  }, [role]);
  

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{unreadCount}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 md:w-96" align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
                 <p className="text-center text-sm text-muted-foreground p-4">No new notifications.</p>
            ) : notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className={cn("flex items-start gap-3 p-3", !notification.read && "bg-accent")}>
                <div className="flex-shrink-0 mt-1">{iconMap[notification.icon]}</div>
                <div className="flex-grow">
                    <p className="font-semibold text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                        {notification.timestamp && formatDistanceToNow(notification.timestamp.toDate(), { addSuffix: true })}
                    </p>
                </div>
                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary mt-1 flex-shrink-0" />}
            </DropdownMenuItem>
            ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button variant="link" size="sm" className="w-full">View all notifications</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
