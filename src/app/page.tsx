
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Sprout,
  Warehouse,
  Leaf,
  Tractor,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  icon: React.ElementType;
  dataAiHint: string;
}

function RoleCard({ role, title, description, icon: Icon }: RoleCardProps) {
  return (
    <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-2 hover:border-primary bg-card/90 backdrop-blur-sm">
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

interface PerformerCardProps {
  name: string;
  location: string;
  achievement: string;
  imageSrc: string;
}

function PerformerCard({ name, location, achievement, imageSrc }: PerformerCardProps) {
    return (
        <Card className="h-full flex flex-col text-center items-center p-4 bg-card/90 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-2 hover:border-primary">
            <Avatar className="h-16 w-16 border-4 border-primary/50 mb-3">
                <AvatarImage src={imageSrc} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardHeader className="p-1">
                <CardTitle className="text-md font-bold">{name}</CardTitle>
                <p className="text-xs text-muted-foreground">{location}</p>
            </CardHeader>
            <CardContent className="p-2 flex-grow flex flex-col justify-center items-center">
                 <Award className="h-5 w-5 text-amber-400 mb-1" />
                <p className="text-xs text-muted-foreground text-center">{achievement}</p>
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
      dataAiHint: "farm crops",
    },
    {
      role: "dealer",
      title: "Dealer",
      description: "Browse surplus crops, place orders, and track deliveries.",
      icon: ShoppingBag,
      dataAiHint: "market stall",
    },
    {
      role: "green-guardian",
      title: "Warehouse Manager",
      description: "Monitor storage, manage inventory, and ensure quality.",
      icon: Warehouse,
      dataAiHint: "warehouse interior",
    },
    {
      role: "logistics",
      title: "Logistics",
      description:
        "Manage transportation, track deliveries, and optimize routes.",
      icon: Truck,
      dataAiHint: "delivery truck",
    },
    {
      role: "admin",
      title: "Admin",
      description: "Oversee the platform, manage users, and view analytics.",
      icon: ShieldCheck,
      dataAiHint: "data dashboard",
    },
  ];
  
  const topPerformers: PerformerCardProps[] = [
    {
        name: "Anjali Sharma",
        location: "Pune Warehouse",
        achievement: "Reduced spoilage by 15% in Q2 2024.",
        imageSrc: "https://i.pravatar.cc/150?u=anjali"
    },
    {
        name: "Rajesh Kumar",
        location: "Nashik Cold Storage",
        achievement: "Maintained 99.8% inventory accuracy.",
        imageSrc: "https://i.pravatar.cc/150?u=rajesh"
    },
    {
        name: "Priya Singh",
        location: "Nagpur Hub",
        achievement: "Fastest average dispatch time in July.",
        imageSrc: "https://i.pravatar.cc/150?u=priya"
    },
    {
        name: "Vikram Patel",
        location: "Mumbai Central",
        achievement: "Zero safety incidents in the last 12 months.",
        imageSrc: "https://i.pravatar.cc/150?u=vikram"
    },
    {
        name: "Sunita Reddy",
        location: "Pune Warehouse",
        achievement: "Highest rated manager by logistics partners.",
        imageSrc: "https://i.pravatar.cc/150?u=sunita"
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  const [performerApi, setPerformerApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    const updateSlideInfo = () => {
      setCurrent(api.selectedScrollSnap());
    }
    
    updateSlideInfo();
    api.on("select", updateSlideInfo);
    
    return () => {
      api.off("select", updateSlideInfo);
    };
  }, [api]);


  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden">
        <div className="relative flex w-full flex-col items-center justify-center p-4 grow">
            <BackgroundGradient hint="agriculture crops" />

            <div className="absolute top-8 z-20 w-full max-w-5xl px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-2 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex justify-between items-center gap-4 h-16">
                        <div className="flex items-center gap-12">
                             <div className="flex-shrink-0">
                                <Image src="https://i.ibb.co/sdZVHNk/download-1.png" alt="download-1" width={100} height={23} className="object-contain" />
                            </div>
                            <div className="flex-shrink-0">
                                <Image src="https://i.ibb.co/bRCtsmHs/Azadi-Ka-Amrit-Mahotsav-Logo.png" alt="Azadi Ka Amrit Mahotsav Logo" width={100} height={23} className="object-contain" />
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-4">
                             <div className="flex-shrink-0">
                                <Image src="https://i.ibb.co/Zz7ZMwXG/Chat-GPT-Image-Sep-7-2025-10-53-41-PM.png" alt="eAgriMarket Logo" width={100} height={23} className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center pt-28 sm:pt-24">
                <div className="mb-6 text-white text-center">
                    <h1 className="text-5xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-top-4 duration-1000">
                        Welcome to eAgriMarket
                    </h1>
                    <p className="max-w-3xl text-center text-xl text-white/80 mt-4 animate-in fade-in slide-in-from-top-8 duration-1000 ease-in-out">
                        Transforming Agriculture with a Single Digital Platform
                    </p>
                </div>

                <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-in-out">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        className="w-full max-w-3xl mx-auto"
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
                </div>
                
                 <div className="mt-20 w-full max-w-5xl text-center animate-in fade-in duration-1000 ease-in-out" style={{ "--index": 4 } as React.CSSProperties}>
                    <h2 className="text-4xl font-bold text-white mb-8">Top Performers</h2>
                     <Carousel
                        setApi={setPerformerApi}
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <CarouselContent className="-ml-4">
                        {topPerformers.map((performer, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 md:basis-1/3 lg:basis-1/4"
                            >
                              <div className="p-1 h-full">
                                  <PerformerCard {...performer} />
                              </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-0 text-white" />
                        <CarouselNext className="mr-0 text-white" />
                    </Carousel>
                </div>
            </div>
        </div>

         <footer className="w-full bg-gray-900 text-white py-12 animate-in fade-in duration-1000 ease-in-out" style={{ "--index": 5 } as React.CSSProperties}>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Logo className="h-8 w-8 text-primary" />
                        <span className="text-xl font-semibold">AgriMarket</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Reducing food waste, one crop at a time. A digital ecosystem for sustainable agriculture.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="#" className="hover:text-white">About Us</Link></li>
                        <li><Link href="#" className="hover:text-white">Careers</Link></li>
                        <li><Link href="#" className="hover:text-white">Press</Link></li>
                        <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                        <li><Link href="#" className="hover:text-white">Cookie Policy</Link></li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-gray-400 hover:text-white"><Facebook className="h-6 w-6" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><Twitter className="h-6 w-6" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><Instagram className="h-6 w-6" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><Linkedin className="h-6 w-6" /></Link>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} AgriMarket. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
}
