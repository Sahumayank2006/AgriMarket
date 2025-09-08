
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Sprout,
  Warehouse,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Users,
  TrendingUp,
  Globe,
  CheckCircle,
  Languages
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo, Emblem, EmblemOfIndia } from "@/components/icons";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Wavy Tricolor Component based on the design
function WavyTricolor({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  
  return (
    <div className={`fixed top-0 ${isLeft ? 'left-0' : 'right-0'} h-full w-20 z-0 pointer-events-none`}>
      {/* Wavy border design */}
      <svg
        width="80"
        height="100%"
        viewBox="0 0 80 800"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <pattern id={`wavyPattern${side}`} x="0" y="0" width="80" height="800" patternUnits="userSpaceOnUse">
            {/* Create wavy path */}
            <path
              d={isLeft 
                // Left strip: rectangle with wavy right edge (waves protrude from the right into the page)
                ? "M0,0 L80,0 L65,50 L80,100 L65,150 L80,200 L65,250 L80,300 L65,350 L80,400 L65,450 L80,500 L65,550 L80,600 L65,650 L80,700 L65,750 L80,800 L0,800 Z"
                // Right strip: rectangle with wavy left edge (waves protrude from the left into the page)
                : "M80,0 L0,0 L15,50 L0,100 L15,150 L0,200 L15,250 L0,300 L15,350 L0,400 L15,450 L0,500 L15,550 L0,600 L15,650 L0,700 L15,750 L0,800 L80,800 Z"
              }
              fill={isLeft ? '#FF9933' : '#138808'}
              opacity="0.4"
            />
            {/* Inner wavy line */}
            <path
              d={isLeft 
                // inner wavy guideline near the right edge for left strip
                ? "M70,0 Q55,40 70,80 T70,160 T70,240 T70,320 T70,400 T70,480 T70,560 T70,640 T70,720 T70,800"
                // inner wavy guideline near the left edge for right strip
                : "M10,0 Q25,40 10,80 T10,160 T10,240 T10,320 T10,400 T10,480 T10,560 T10,640 T10,720 T10,800"
              }
              stroke={isLeft ? '#FF9933' : '#138808'}
              strokeWidth="2"
              fill="none"
              opacity="0.18"
            />
            {/* Outer wavy line */}
            <path
              d={isLeft 
                // outer guideline near the right edge for left strip
                ? "M75,0 Q60,60 75,120 T75,240 T75,360 T75,480 T75,600 T75,720 T75,800"
                // outer guideline near the left edge for right strip
                : "M5,0 Q20,60 5,120 T5,240 T5,360 T5,480 T5,600 T5,720 T5,800"
              }
              stroke={isLeft ? '#FF9933' : '#138808'}
              strokeWidth="1.5"
              fill="none"
              opacity="0.12"
            />
          </pattern>
        </defs>
        
        <rect width="80" height="100%" fill={`url(#wavyPattern${side})`} />
      </svg>
    </div>
  );
}

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
            {title}
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
  role: string;
}

function PerformerCard({ name, location, achievement, role }: PerformerCardProps) {
    return (
        <Card className="h-full flex flex-col text-center items-center p-4 bg-white border border-orange-100 animate-fade-in transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-1">
            <Avatar className="h-14 w-14 border border-green-200 mb-3 bg-gradient-to-br from-orange-100 to-green-100">
                <AvatarFallback className="font-medium text-orange-700">{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardHeader className="p-1">
                <CardTitle className="text-sm font-medium text-gray-900">{name}</CardTitle>
                <p className="text-xs font-light text-gray-600">{location}</p>
                <p className="text-xs font-medium text-green-700">{role}</p>
            </CardHeader>
            <CardContent className="p-2 flex-grow flex flex-col justify-center items-center">
                 <Award className="h-4 w-4 text-orange-600 mb-1" />
                <p className="text-xs font-light text-gray-600 text-center">{achievement}</p>
            </CardContent>
        </Card>
    );
}


export default function RoleSelectionPage() {
  const [isHindi, setIsHindi] = useState(false);

  const roles: RoleCardProps[] = [
    {
      role: "farmer",
      title: isHindi ? "किसान" : "Farmer",
      description: isHindi ? "अपनी फसलों का प्रबंधन करें, खराबी की भविष्यवाणी करें और बर्बादी कम करें।" : "Manage your crops, predict spoilage, and reduce waste.",
      icon: Sprout,
      dataAiHint: "farm crops",
    },
    {
      role: "dealer",
      title: isHindi ? "डीलर" : "Dealer",
      description: isHindi ? "अतिरिक्त फसलों को देखें, ऑर्डर दें और डिलीवरी ट्रैक करें।" : "Browse surplus crops, place orders, and track deliveries.",
      icon: ShoppingBag,
      dataAiHint: "market stall",
    },
    {
      role: "green-guardian",
      title: isHindi ? "वेयरहाउस मैनेजर" : "Warehouse Manager",
      description: isHindi ? "भंडारण की निगरानी करें, इन्वेंटरी का प्रबंधन करें और गुणवत्ता सुनिश्चित करें।" : "Monitor storage, manage inventory, and ensure quality.",
      icon: Warehouse,
      dataAiHint: "warehouse interior",
    },
    {
      role: "logistics",
      title: isHindi ? "लॉजिस्टिक्स" : "Logistics",
      description: isHindi ? "परिवहन का प्रबंधन करें, डिलीवरी ट्रैक करें और मार्गों को अनुकूलित करें।" : "Manage transportation, track deliveries, and optimize routes.",
      icon: Truck,
      dataAiHint: "delivery truck",
    },
    {
      role: "admin",
      title: isHindi ? "एडमिन" : "Admin",
      description: isHindi ? "प्लेटफॉर्म की निगरानी करें, उपयोगकर्ताओं का प्रबंधन करें और एनालिटिक्स देखें।" : "Oversee the platform, manage users, and view analytics.",
      icon: ShieldCheck,
      dataAiHint: "data dashboard",
    },
  ];
  
  const topPerformers: PerformerCardProps[] = [
    {
        name: "Anjali Sharma",
        location: "Pune Warehouse",
        achievement: "Reduced spoilage by 15% in Q2 2024.",
        role: "Warehouse Manager"
    },
    {
        name: "Rajesh Kumar",
        location: "Nashik Cold Storage",
        achievement: "Maintained 99.8% inventory accuracy.",
        role: "Storage Specialist"
    },
    {
        name: "Priya Singh",
        location: "Nagpur Hub",
        achievement: "Fastest average dispatch time in July.",
        role: "Logistics Manager"
    },
    {
        name: "Vikram Patel",
        location: "Mumbai Central",
        achievement: "Zero safety incidents in the last 12 months.",
        role: "Safety Officer"
    },
    {
        name: "Sunita Reddy",
        location: "Pune Warehouse",
        achievement: "Highest rated manager by logistics partners.",
        role: "Operations Manager"
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
    <div className={cn("flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-gray-50 relative overflow-x-hidden", isHindi && "hind")}>
        {/* Wavy Tricolor borders */}
        <WavyTricolor side="left" />
        <WavyTricolor side="right" />
        
        <div className="relative flex w-full flex-col items-center justify-center p-4 grow z-10">
            {/* Language Switch and Header section */}
            <div className="absolute top-8 z-20 w-full max-w-5xl px-4">
                <div className="bg-white/95 dark:bg-gray-50/95 backdrop-blur-sm github-border rounded github-shadow p-4 animate-scale-in border border-orange-200">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <EmblemOfIndia className="h-6 w-6 text-amber-600" />
                            <span className="text-sm font-medium text-gray-700 ml-1">
                              {isHindi ? "भारत सरकार" : "Government of India"}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Language Switch */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsHindi(!isHindi)}
                                className="flex items-center gap-2 border-orange-200 hover:bg-orange-50"
                            >
                                <Languages className="h-4 w-4" />
                                {isHindi ? "English" : "हिंदी"}
                            </Button>
                            <div className="flex items-center gap-2">
                                <EmblemOfIndia className="h-8 w-8 text-amber-600" />
                                <span className="text-lg font-medium text-gray-900">AaharSetu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center pt-28 sm:pt-40">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl text-gray-900 animate-fade-in">
                        {isHindi ? "आहार सेतु में आपका स्वागत है" : "Welcome to AaharSetu"}
                    </h1>
                    <p className="max-w-3xl text-center text-lg font-light text-gray-700 mt-4 animate-slide-in-right">
                        {isHindi ? "डिजिटल नवाचार के साथ कृषि को बदलना" : "Transforming Agriculture with Digital Innovation"}
                    </p>
                </div>

                {/* Feature highlights with Indian colors */}
                <div className="my-8 w-full max-w-4xl animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-white border border-orange-200 rounded github-shadow hover:shadow-md transition-shadow">
                            <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              {isHindi ? "स्मार्ट विश्लेषण" : "Smart Analytics"}
                            </p>
                        </div>
                        <div className="text-center p-4 bg-white border border-green-200 rounded github-shadow hover:shadow-md transition-shadow">
                            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              {isHindi ? "किसान नेटवर्क" : "Farmer Network"}
                            </p>
                        </div>
                        <div className="text-center p-4 bg-white border border-orange-200 rounded github-shadow hover:shadow-md transition-shadow">
                            <CheckCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              {isHindi ? "गुणवत्ता आश्वासन" : "Quality Assured"}
                            </p>
                        </div>
                        <div className="text-center p-4 bg-white border border-green-200 rounded github-shadow hover:shadow-md transition-shadow">
                            <Globe className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              {isHindi ? "पूरे भारत में" : "Pan India"}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="mb-8 text-center text-base font-medium text-gray-700 animate-slide-in-left">
                  <p>{isHindi ? "अपनी भूमिका चुनें" : "Choose Your Role to Get Started"}</p>
                </div>

                <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-in-out" style={{ "--index": 4 } as React.CSSProperties}>
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
                        <CarouselPrevious className="ml-10 border border-orange-200 bg-white hover:bg-orange-50" />
                        <CarouselNext className="mr-10 border border-green-200 bg-white hover:bg-green-50" />
                    </Carousel>
                </div>

                <div className="mt-20 w-full max-w-5xl text-center animate-fade-in">
                    <Separator className="bg-orange-300 mb-6" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {isHindi ? "खेत से बाज़ार तक" : "From Farm to Market"}
                    </h2>
                    <p className="text-sm text-gray-600 mb-8">
                      {isHindi ? "डिजिटल इंडिया के तहत कृषि सुधार" : "Agricultural Transformation under Digital India"}
                    </p>
                    
                    {/* Stats section with Indian government colors */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center p-6 bg-white border border-orange-200 rounded github-shadow hover:shadow-md transition-shadow">
                            <div className="text-3xl font-semibold text-orange-600 mb-2">5,000+</div>
                            <div className="text-sm font-medium text-gray-700">
                              {isHindi ? "सक्रिय किसान" : "Active Farmers"}
                            </div>
                        </div>
                        <div className="text-center p-6 bg-white border border-green-200 rounded github-shadow hover:shadow-md transition-shadow">
                            <div className="text-3xl font-semibold text-green-600 mb-2">95%</div>
                            <div className="text-sm font-medium text-gray-700">
                              {isHindi ? "अपशिष्ट में कमी" : "Waste Reduction"}
                            </div>
                        </div>
                        <div className="text-center p-6 bg-white border border-orange-200 rounded github-shadow hover:shadow-md transition-shadow">
                            <div className="text-3xl font-semibold text-orange-600 mb-2">24x7</div>
                            <div className="text-sm font-medium text-gray-700">
                              {isHindi ? "सहायता उपलब्ध" : "Support Available"}
                            </div>
                        </div>
                    </div>
                </div>
                
                 <div className="mt-16 w-full max-w-5xl text-center animate-slide-in-left">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {isHindi ? "शीर्ष प्रदर्शक" : "Top Performers"}
                    </h2>
                    <p className="text-sm text-gray-600 mb-8">
                      {isHindi ? "उत्कृष्टता के लिए सम्मानित" : "Recognized for Excellence"}
                    </p>
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
                        <CarouselPrevious className="ml-0 border border-orange-200 bg-white hover:bg-orange-50" />
                        <CarouselNext className="mr-0 border border-green-200 bg-white hover:bg-green-50" />
                    </Carousel>
                </div>
            </div>
        </div>

         <footer className="w-full bg-white border-t border-orange-200 py-12 animate-fade-in">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <EmblemOfIndia className="h-8 w-8 text-amber-600" />
                        <span className="text-xl font-medium text-gray-900">AaharSetu</span>
                    </div>
                    <p className="text-gray-600 text-sm font-light mb-2">
                        {isHindi ? "आहार सेतु - भारत सरकार की पहल" : "AaharSetu - Government of India Initiative"}
                    </p>
                    <p className="text-gray-500 text-xs font-light">
                        {isHindi ? "खाद्य अपशिष्ट को कम करना, एक फसल एक समय में। सतत कृषि के लिए एक डिजिटल पारिस्थितिकी तंत्र।" : "Reducing food waste, one crop at a time. A digital ecosystem for sustainable agriculture."}
                    </p>
                </div>
                <div>
                    <h4 className="font-medium mb-4 text-gray-900">
                      {isHindi ? "सेवाएं" : "Services"}
                    </h4>
                    <ul className="space-y-2 text-sm font-light text-gray-600">
                        <li><Link href="#" className="hover:text-orange-600 transition-colors">
                          {isHindi ? "फसल प्रबंधन" : "Crop Management"}
                        </Link></li>
                        <li><Link href="#" className="hover:text-green-600 transition-colors">
                          {isHindi ? "बाजार पहुंच" : "Market Access"}
                        </Link></li>
                        <li><Link href="#" className="hover:text-orange-600 transition-colors">
                          {isHindi ? "कोल्ड स्टोरेज" : "Cold Storage"}
                        </Link></li>
                        <li><Link href="#" className="hover:text-green-600 transition-colors">
                          {isHindi ? "परिवहन" : "Transportation"}
                        </Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-medium mb-4 text-gray-900">
                      {isHindi ? "सहायता" : "Support"}
                    </h4>
                    <ul className="space-y-2 text-sm font-light text-gray-600">
                        <li><Link href="#" className="hover:text-orange-600 transition-colors">
                          {isHindi ? "हेल्पलाइन: 1800-XXX-XXXX" : "Helpline: 1800-XXX-XXXX"}
                        </Link></li>
                        <li><Link href="#" className="hover:text-green-600 transition-colors">
                          {isHindi ? "किसान प्रशिक्षण" : "Farmer Training"}
                        </Link></li>
                        <li><Link href="#" className="hover:text-orange-600 transition-colors">
                          {isHindi ? "तकनीकी सहायता" : "Technical Support"}
                        </Link></li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-medium mb-4 text-gray-900">
                       {isHindi ? "संपर्क" : "Connect"}
                     </h4>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-gray-600 hover:text-orange-600 transition-colors"><Facebook className="h-5 w-5" /></Link>
                        <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors"><Twitter className="h-5 w-5" /></Link>
                        <Link href="#" className="text-gray-600 hover:text-orange-600 transition-colors"><Instagram className="h-5 w-5" /></Link>
                        <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors"><Linkedin className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-orange-200 text-center text-sm font-light text-gray-500">
                <p>&copy; {new Date().getFullYear()} AaharSetu - {isHindi ? "भारत सरकार" : "Government of India"}. {isHindi ? "सभी अधिकार सुरक्षित।" : "All rights reserved."}</p>
                <p className="text-xs mt-1">
                  {isHindi ? "डिजिटल इंडिया पहल का हिस्सा" : "Part of Digital India Initiative"}
                </p>
            </div>
        </footer>
    </div>
  );
}
