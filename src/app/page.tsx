

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
  Linkedin,
  Upload,
  FileText,
  X,
  Languages,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDropzone } from "react-dropzone";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


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
  role: string;
  location: string;
  achievement: string;
  avatarUrl: string;
}

function PerformerCard({ name, role, location, achievement, avatarUrl }: PerformerCardProps) {
    return (
        <Card className="h-full flex flex-col p-6 bg-blue-100 dark:bg-blue-900/30 border-blue-200 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-0 flex-grow">
                <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20 border-4 border-white flex-shrink-0">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                             <div className="flex-1">
                                <h4 className="font-bold text-lg text-foreground">{name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{role}</p>
                                <p className="text-sm text-muted-foreground">{location}</p>
                             </div>
                            <div className="text-right">
                                <Image src="https://i.ibb.co/sp1M0WnQ/Copilot-20250908-154142-Photoroom.png" alt="Medal" width={60} height={60} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <div className="mt-4">
                <div className="bg-white dark:bg-card rounded-full px-4 py-2 text-sm text-blue-800 dark:text-blue-200 font-semibold shadow-inner text-center">
                    {achievement}
                </div>
            </div>
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
      role: "Logistics Head",
      location: "Maharashtra Region",
      achievement: "1.2 tons of food wastage saved",
      avatarUrl: "https://i.pravatar.cc/150?u=vijay"
    },
    {
      name: "Meera Patel",
      role: "Warehouse Manager",
      location: "Nashik Cold Storage",
      achievement: "25% spoilage reduction",
      avatarUrl: "https://i.pravatar.cc/150?u=meera"
    },
    {
      name: "Rohan Gupta",
      role: "Top Farmer",
      location: "Pune District",
      achievement: "Highest crop utilization rate",
      avatarUrl: "https://i.pravatar.cc/150?u=rohan"
    },
    {
      name: "Aisha Sharma",
      role: "Quality Control Lead",
      location: "Nagpur Hub",
      achievement: "99.8% quality rating",
      avatarUrl: "https://i.pravatar.cc/150?u=aisha"
    },
    {
      name: "Suresh Singh",
      role: "Top Dealer",
      location: "Aurangabad",
      achievement: "50+ tons of surplus moved",
      avatarUrl: "https://i.pravatar.cc/150?u=suresh"
    },
    {
        name: "Priya Rao",
        role: "Eco-Farmer",
        location: "Satara",
        achievement: "30% reduction in food waste",
        avatarUrl: "https://i.pravatar.cc/150?u=priya"
    },
    {
        name: "Amit Deshmukh",
        role: "Logistics Coordinator",
        location: "Mumbai Port",
        achievement: "On-time delivery rate 98%",
        avatarUrl: "https://i.pravatar.cc/150?u=amit"
    }
  ];

  const impactStats = [
    {
        icon: Warehouse,
        value: "150+",
        label: "Warehouses Connected",
    },
    {
        icon: Leaf,
        value: "5,000+ Tons",
        label: "Food Saved from Waste",
    },
    {
        icon: IndianRupee,
        value: "₹25 Cr+",
        label: "Value Created for Farmers",
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [performerApi, setPerformerApi] = useState<CarouselApi>();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };


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

  useEffect(() => {
    if (!performerApi) {
      return;
    }
  }, [performerApi]);


  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background">
      <div className="w-full h-24 bg-white flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Image src="https://i.ibb.co/td7KZ93/Chat-GPT-Image-Sep-9-2025-07-46-01-AM.png" alt="AaharSetu Logo" width={112} height={45} />
          <Image src="https://i.ibb.co/R4S2M88G/Azadi-Ka-Amrit-Mahotsav-Logo.png" alt="Azadi-Ka-Amrit-Mahotsav-Logo" width={68} height={68} />
          <Image src="https://i.ibb.co/twpxgfHk/logoagriculture.png" alt="logoagriculture" width={168} height={68}/>
        </div>
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Languages className="mr-2 h-4 w-4" />
                  English
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>हिंदी</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <hr className="w-full border-t-4 border-primary" />
        <div className="flex w-full flex-col items-center justify-center p-4 grow wavy-border">

            <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-center pt-16">
                <div className="mb-6 text-foreground">
                    <h1 className="text-5xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-top-4 duration-1000">
                        Welcome to AaharSetu
                    </h1>
                </div>
                <p className="max-w-3xl text-center text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-top-6 duration-1000">
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
                    </div>

                    <div className="my-12">
                        <Image src="https://i.ibb.co/TB55Lx4Q/Chat-GPT-Image-Sep-9-2025-07-46-12-AM.png" alt="Partner Logos" width={800} height={92} className="mx-auto" />
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
                                className="pl-4 md:basis-1/2 lg:basis-[48%]"
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

                <div className="mt-20 w-full max-w-5xl text-center animate-in fade-in duration-1000">
                    <div className="mb-8">
                        <hr className="w-1/4 mx-auto border-t-2 border-primary/20" />
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Standard Guidelines</h2>
                        <p className="max-w-2xl mx-auto text-muted-foreground mb-8">Access and download the operational guidelines, quality standards, and best practices for all platform stakeholders.</p>
                        <Card className="max-w-3xl mx-auto text-left">
                            <CardHeader>
                                <CardTitle>Document Center</CardTitle>
                                <CardDescription>Upload or download important PDF documents, DOCX files, etc.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div {...getRootProps()} className={cn("flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50", isDragActive && "bg-muted/50 border-primary")}>
                                    <input {...getInputProps()} />
                                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        {isDragActive ? "Drop the files here ..." : "Drag 'n' drop some files here, or click to select files"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">PDF, DOCX, etc. up to 10MB</p>
                                </div>
                                {files.length > 0 && (
                                    <div className="mt-4 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                        {files.map(file => (
                                            <Card key={file.name} className="p-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                   <FileText className="h-5 w-5 flex-shrink-0" />
                                                   <span className="text-sm truncate">{file.name}</span>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(file.name)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                     </div>
                </div>

                <div className="mt-20 w-full max-w-5xl text-center animate-in fade-in duration-1000">
                     <div className="mb-8">
                        <hr className="w-1/4 mx-auto border-t-2 border-primary/20" />
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-8">Our Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {impactStats.map((stat, index) => (
                         <Card key={index} className="p-6 text-center">
                            <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                            <p className="text-4xl font-bold">{stat.value}</p>
                            <p className="text-muted-foreground mt-1">{stat.label}</p>
                         </Card>
                       ))}
                    </div>
                </div>
            </div>
        </div>

         <footer className="w-full bg-gray-900 text-white py-12 animate-in fade-in duration-1000 mt-20">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Logo className="h-8 w-8 text-primary" />
                        <span className="text-xl font-semibold">AaharSetu</span>
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
                <p>&copy; {new Date().getFullYear()} AaharSetu. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
}
