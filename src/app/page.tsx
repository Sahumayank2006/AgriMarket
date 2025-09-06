"use client";

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
  type CarouselApi,
} from "@/components/ui/carousel";
import { BackgroundGradient } from "@/components/background-gradient";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  icon: React.ElementType;
}

function RoleCard({ role, title, description, icon: Icon }: RoleCardProps) {
  return (
    <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:border-primary bg-card/90 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <Icon className="h-8 w-8 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-base text-muted-foreground mb-6 min-h-[60px]">{description}</p>
        <Button asChild size="lg" className="w-full text-lg">
          <Link href={`/dashboard?role=${role}`}>
            Continue as {title}
            <ArrowRight className="ml-2 h-5 w-5" />
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

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);


  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4">
        <BackgroundGradient />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center">
            <div className="flex items-center gap-4 mb-6 text-white">
                <Logo className="h-16 w-16" />
                <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                Welcome to AgriMarket
                </h1>
            </div>
            <p className="max-w-3xl text-center text-xl text-white/80 mb-12">
                Your integrated platform for smart food waste management. Select your role to begin your journey towards a more sustainable future.
            </p>

            <Carousel
                setApi={setApi}
                opts={{
                    align: "center",
                    loop: true,
                }}
                className="w-full max-w-3xl"
            >
                <CarouselContent className="-ml-4">
                {roles.map((role, index) => (
                    <CarouselItem
                        key={index}
                        className={cn(
                            "pl-4 md:basis-1/2 lg:basis-1/3 transition-all duration-300",
                            "carousel-item",
                            { "is-active": index === current }
                        )}
                        style={{
                            opacity: "var(--carousel-item-opacity, 0.3)",
                            transform: "scale(var(--carousel-item-scale, 0.9))",
                        }}
                    >
                      <div className="p-1">
                          <RoleCard {...role} />
                      </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="ml-10" />
                <CarouselNext className="mr-10" />
            </Carousel>

            <footer className="mt-20 text-center text-white/70 text-sm">
                <p>&copy; {new Date().getFullYear()} AgriMarket. All rights reserved.</p>
                <p className="mt-1">Reducing food waste, one crop at a time.</p>
            </footer>
        </div>
    </div>
  );
}
