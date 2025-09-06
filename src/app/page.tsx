import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  User,
  Building,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Leaf,
  Sprout,
  Warehouse,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons";
import type { Role } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BackgroundGradient } from "@/components/background-gradient";

interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  icon: React.ElementType;
}

function RoleCard({ role, title, description, icon: Icon }: RoleCardProps) {
  return (
    <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary bg-background/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{description}</p>
        <Button asChild className="w-full">
          <Link href={`/dashboard?role=${role}`}>
            Continue as {title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function RoleSelectionPage() {
  const roles: RoleCardProps[] = [
    {
      role: "farmer",
      title: "Farmer",
      description: "Manage your crops, predict spoilage, and reduce waste.",
      icon: Sprout,
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
      icon: Warehouse,
    },
    {
      role: "logistics",
      title: "Logistics",
      description:
        "Manage transportation, track deliveries, and optimize routes.",
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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
        <BackgroundGradient />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex w-full flex-col items-center justify-center p-4">
            <div className="flex items-center gap-4 mb-4">
                <Logo className="h-12 w-12 text-white" />
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Welcome to AgriMarket
                </h1>
            </div>
            <p className="max-w-3xl text-center text-lg text-white/80 mb-12">
                Your integrated platform for smart food waste management. Select your role to begin your journey towards a more sustainable future.
            </p>

            <Carousel
                opts={{
                align: "center",
                loop: true,
                }}
                className="w-full max-w-sm md:max-w-md"
            >
                <CarouselContent>
                {roles.map((role, index) => (
                    <CarouselItem key={index}>
                    <div className="p-1">
                        <RoleCard {...role} />
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <footer className="mt-16 text-center text-white/70 text-sm">
                <p>&copy; {new Date().getFullYear()} AgriMarket. All rights reserved.</p>
                <p className="mt-1">Reducing food waste, one crop at a time.</p>
            </footer>
        </div>
    </div>
  );
}
