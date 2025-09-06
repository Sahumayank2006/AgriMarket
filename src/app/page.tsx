import Link from "next/link";
import {
  ArrowRight,
  User,
  Building,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons";
import type { Role } from "@/lib/types";

interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  icon: React.ElementType;
}

function RoleCard({ role, title, description, icon: Icon }: RoleCardProps) {
  return (
    <Link href={`/dashboard?role=${role}`} className="group">
      <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Icon className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center text-sm font-semibold text-primary">
            Continue as {title}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function RoleSelectionPage() {
  const roles: RoleCardProps[] = [
    {
      role: "farmer",
      title: "Farmer",
      description: "Manage your crops, predict spoilage, and reduce waste.",
      icon: User,
    },
    {
      role: "dealer",
      title: "Dealer",
      description: "Browse surplus crops, place orders, and track deliveries.",
      icon: ShoppingBag,
    },
    {
      role: "green-guardian",
      title: "Warehouse Manager",
      description: "Monitor storage, manage inventory, and ensure quality.",
      icon: Building,
    },
    {
      role: "logistics",
      title: "Logistics",
      description: "Manage transportation, track deliveries, and optimize routes.",
      icon: Truck,
    },
    {
      role: "admin",
      title: "Admin",
      description: "Oversee the platform, manage users, and view analytics.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex items-center gap-4 mb-8">
        <Logo className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Welcome to AgriMarket
        </h1>
      </div>
      <p className="max-w-2xl text-center text-lg text-muted-foreground mb-12">
        Your platform for smart food waste management. Select your role to get started and join our mission to build a sustainable future.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-6xl w-full">
        {roles.map((role) => (
          <RoleCard key={role.role} {...role} />
        ))}
      </div>
       <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} AgriMarket. All rights reserved.</p>
        <p className="mt-1">Reducing food waste, one crop at a time.</p>
      </footer>
    </div>
  );
}
