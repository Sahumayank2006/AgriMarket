
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
  IndianRupee,
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
    <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-2 hover:border-primary bg-card">
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
  moneySaved?: string;
}

function PerformerCard({ name, location, achievement, imageSrc, moneySaved }: PerformerCardProps) {
    return (
        <Card className="h-full flex flex-col p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-blue-200">
                    <AvatarImage src={imageSrc} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h4 className="font-bold text-sm">{name}</h4>
                    <p className="text-xs text-muted-foreground">{location}</p>
                </div>
            </div>
            <CardContent className="p-0 pt-3 flex-grow">
                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Award className="h-4 w-4 text-amber-500" />
                    <p className="flex-1">{achievement}</p>
                 </div>
                 {moneySaved && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                        <IndianRupee className="h-4 w-4 text-green-500" />
                        <p className="flex-1 font-medium">{moneySaved}</p>
                    </div>
                 )}
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
        name: "Vijay Kumar",
        location: "Maharashtra Region",
        achievement: "Highest reduction in transport costs.",
        imageSrc: "https://i.pravatar.cc/150?u=vijay",
        moneySaved: "Saved ₹50,000 on logistics."
    },
    {
        name: "Meera Patel",
        location: "Nashik Cold Storage",
        achievement: "Reduced spoilage by 25% for tomatoes.",
        imageSrc: "https://i.pravatar.cc/150?u=meera",
        moneySaved: "Saved produce worth ₹1,20,000."
    },
    {
        name: "Rohan Gupta",
        location: "Pune Distribution",
        achievement: "Fastest average delivery time in Q2.",
        imageSrc: "https://i.pravatar.cc/150?u=rohan",
        moneySaved: "Improved customer satisfaction by 15%."
    },
    {
        name: "Aisha Sharma",
        location: "Nagpur Hub",
        achievement: "Top-rated farmer for produce quality.",
        imageSrc: "https://i.pravatar.cc/150?u=aisha",
        moneySaved: "Secured premium pricing on 80% of sales."
    },
    {
        name: "Suresh Singh",
        location: "Aurangabad Warehouse",
        achievement: "Best inventory management accuracy.",
        imageSrc: "https://i.pravatar.cc/150?u=suresh",
        moneySaved: "Prevented ₹75,000 in potential losses."
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
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background">
      <div className="w-full h-24 bg-white flex items-center justify-center">
        <Image src="https://i.ibb.co/6RGXhqsJ/Azadi-Ka-Amrit-Mahotsav-Logo.png" alt="Azadi Ka Amrit Mahotsav Logo" width={112} height={45} />
      </div>
      <hr className="w-full border-t-4 border-primary" />
        <div className="flex w-full flex-col items-center justify-center p-4 grow">

            <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-center pt-16">
                <div className="mb-6 text-foreground">
                    <h1 className="text-5xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-top-4 duration-1000">
                        Welcome to AharaSetu
                    </h1>
                </div>
                <p className="max-w-3xl text-center text-xl text-muted-foreground mb-12 animate-in fade-in slide-in-from-top-6 duration-1000">
                    Transforming Agriculture with a Single Digital Platform
                </p>

                 <p className="text-lg text-muted-foreground mb-8">Choose Your Role to Get Started</p>

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000"
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
                
                 <div className="mt-20 w-full max-w-5xl text-center animate-in fade-in duration-1000">
                    <div className="mb-8">
                        <hr className="w-1/4 mx-auto border-t-2 border-primary/20" />
                        <p className="text-lg text-muted-foreground mt-4">Seamless Agricultural Operations – From Farm to Market</p>
                    </div>

                    <h2 className="text-4xl font-bold text-foreground mb-8">Top Performers</h2>
                     <Carousel
                        setApi={setPerformerApi}
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full max-w-5xl mx-auto"
                    >
                        <CarouselContent className="-ml-4">
                        {topPerformers.map((performer, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                              <div className="p-1 h-full">
                                  <PerformerCard {...performer} />
                              </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-0" />
                        <CarouselNext className="mr-0" />
                    </Carousel>
                </div>
            </div>
        </div>

         <footer className="w-full bg-gray-900 text-white py-12 animate-in fade-in duration-1000">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Logo className="h-8 w-8 text-primary" />
                        <span className="text-xl font-semibold">AharaSetu</span>
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
                <p>&copy; {new Date().getFullYear()} AharaSetu. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
}
