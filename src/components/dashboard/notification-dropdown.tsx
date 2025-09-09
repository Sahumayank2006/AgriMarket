
"use client";

import {
  Bell,
  CheckCircle,
  Package,
  AlertTriangle,
  User,
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

const notifications = [
  {
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    title: "New slot booking confirmed!",
    description: "Rohan Gupta booked a slot for 10 quintals of Tomatoes.",
    time: "2 minutes ago",
    read: false,
  },
  {
    icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    title: "Spoilage Alert",
    description: "Your potatoes have a high risk of spoilage.",
    time: "1 hour ago",
    read: false,
  },
  {
    icon: <Package className="h-4 w-4 text-blue-500" />,
    title: "Order Shipped",
    description: "Your order #ORD-002 has been shipped.",
    time: "1 day ago",
    read: true,
  },
  {
    icon: <User className="h-4 w-4 text-purple-500" />,
    title: "New Bid Received",
    description: "Agro Traders placed a bid on your Red Apples.",
    time: "2 days ago",
    read: true,
  },
];

export function NotificationDropdown() {
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
            {notifications.map((notification, index) => (
            <DropdownMenuItem key={index} className={cn("flex items-start gap-3 p-3", !notification.read && "bg-accent")}>
                <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                <div className="flex-grow">
                    <p className="font-semibold text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{notification.time}</p>
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
