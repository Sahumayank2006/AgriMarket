
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
  Shield,
  CircleDot,
  Cloud,
  Heart,
  Wheat,
  Users,
  Star,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
import { useEffect, useState, useCallback, useContext } from "react";
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
import { LanguageContext, content } from "@/contexts/language-context";
import type { LangKey } from "@/contexts/language-context";

// Animated Counter Component
function AnimatedCounter({ start = 0, end, duration = 2000, prefix = "", suffix = "" }: {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [start, end, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}


interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  icon: React.ElementType;
  dataAiHint: string;
}

function RoleCard({ role, title, description, icon: Icon, lang, continueAsText }: RoleCardProps & { lang: LangKey; continueAsText: string }) {
  return (
    <Card className="group h-full flex flex-col text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-primary/20 hover:shadow-2xl">
      <CardHeader className="items-center pt-8">
         <div className="p-4 bg-secondary rounded-full ring-8 ring-background group-hover:ring-primary/10 transition-all duration-300">
            <Icon className="h-8 w-8 text-primary" />
         </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mt-2 text-base text-muted-foreground min-h-[50px]">
            {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
         <Button asChild size="lg" className="w-full text-lg">
          <Link href={`/dashboard?role=${role}&lang=${lang}`}>
             {continueAsText} {title}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface PerformerCardProps {
  name: string;
  role: string;
  location: string;
  grainsSaved: string;
  avatarUrl: string;
}

function PerformerCard({ name, role, location, grainsSaved, avatarUrl }: PerformerCardProps) {
  return (
    <Card className="relative group bg-sky-100/50 dark:bg-blue-900/30 rounded-2xl border-2 border-transparent hover:border-blue-300 transition-all duration-300 flex flex-col items-center p-6 text-center h-full overflow-hidden">
        <Users className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-24 text-blue-200/50 dark:text-blue-800/50" />
        <Image src="https://i.ibb.co/9kdhzXMM/Generated-Image-September-10-2025-7-55-PM.png" alt="eAaharSetu mini logo" width={80} height={32} className="mb-4" />
        <Avatar className="h-20 w-20 border-4 border-white dark:border-blue-900/50 ring-2 ring-blue-200 dark:ring-blue-700 mb-3">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-blue-200 text-blue-800 font-medium text-lg">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="font-bold text-lg text-blue-900 dark:text-blue-100">{name}</div>
        <div className="text-sm text-blue-800 dark:text-blue-200 font-light">{role}</div>
        <div className="text-xs text-blue-600 dark:text-blue-300 font-light mb-4">{location}</div>

        <div className="mt-auto bg-white/70 dark:bg-blue-900/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-sm text-blue-900 dark:text-blue-100 font-medium shadow-sm">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>{grainsSaved} Grains Saved</span>
        </div>
    </Card>
  );
}

interface GuidelineCardProps {
  title: string;
  year: string;
  size: string;
  imageUrl: string;
  downloadUrl: string;
}

function GuidelineCard({ title, year, size, imageUrl, downloadUrl }: GuidelineCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-lg">
      <a href={downloadUrl} download>
        <CardContent className="p-0 relative">
          <Image src={imageUrl} alt={title} width={250} height={150} className="w-full h-auto object-cover" />
          <div className="absolute top-2 right-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs h-7">
              <Download className="mr-2 h-3 w-3" />
              {size}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-3 bg-white dark:bg-card">
          <div>
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">{year}</p>
          </div>
        </CardFooter>
      </a>
    </Card>
  );
}

export default function RoleSelectionPage() {
  const { lang, setLang } = useContext(LanguageContext);
  const pageContent = content[lang];
  
  const topPerformers: PerformerCardProps[] = [
    {
      name: "Vijay Kumar",
      role: "Logistics Head",
      location: "Maharashtra Region",
      grainsSaved: "1.2 Tons",
      avatarUrl: "https://i.ibb.co/Ldv5mMD/indian-farmer-2.jpg"
    },
    {
      name: "Meera Patel", 
      role: "Warehouse Manager",
      location: "Nashik Cold Storage",
      grainsSaved: "800 kg",
      avatarUrl: "https://i.ibb.co/L6wzGZx/indian-farmer-3.jpg"
    },
    {
      name: "Rohan Gupta",
      role: "Top Farmer", 
      location: "Pune District",
      grainsSaved: "1.5 Tons",
      avatarUrl: "https://i.ibb.co/QvRcVK86/Copilot-20250915-232755.png"
    },
    {
      name: "Aisha Sharma",
      role: "Quality Control Lead",
      location: "Nagpur Hub", 
      grainsSaved: "750 kg",
      avatarUrl: "https://i.ibb.co/3Wk09vj/indian-farmer-4.jpg"
    },
    {
      name: "Suresh Singh",
      role: "Top Dealer",
      location: "Aurangabad",
      grainsSaved: "2.1 Tons",
      avatarUrl: "https://i.ibb.co/fHn3v3V/indian-farmer-1.jpg"
    },
    {
        name: "Priya Rao",
        role: "Eco-Farmer",
        location: "Satara", 
        grainsSaved: "900 kg",
        avatarUrl: "https://i.ibb.co/v4d71vN/indian-farmer-5.jpg"
    },
    {
        name: "Amit Deshmukh",
        role: "Logistics Coordinator",
        location: "Mumbai Port",
        grainsSaved: "600 kg",
        avatarUrl: "https://i.ibb.co/VWVj4k3/indian-farmer-6.jpg"
    }
  ];

  const guidelines: GuidelineCardProps[] = [
    { 
      title: "Farmer Handbook",
      year: "2024",
      size: "1.2 MB",
      imageUrl: "https://i.ibb.co/F8Y0YQf/doc-preview.png",
      downloadUrl: "/docs/farmer-handbook.pdf"
    },
    { 
      title: "Dealer Operations Manual",
      year: "2024",
      size: "850 KB",
      imageUrl: "https://i.ibb.co/F8Y0YQf/doc-preview.png",
      downloadUrl: "/docs/dealer-manual.pdf"
    },
    { 
      title: "Warehouse Best Practices",
      year: "2024",
      size: "1.5 MB",
      imageUrl: "https://i.ibb.co/F8Y0YQf/doc-preview.png",
      downloadUrl: "/docs/warehouse-practices.pdf"
    },
    { 
      title: "Platform Usage Policy",
      year: "2024",
      size: "450 KB",
      imageUrl: "https://i.ibb.co/F8Y0YQf/doc-preview.png",
      downloadUrl: "/docs/platform-policy.pdf"
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
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="w-full bg-white px-4">
        <div className="grid grid-cols-3 items-center md:hidden h-14">
          <div className="flex items-center gap-2 justify-start">
            <Image src="https://i.ibb.co/9kdhzXMM/Generated-Image-September-10-2025-7-55-PM.png" alt="eAaharSetu Logo" width={80} height={32} />
          </div>
          <div className="flex justify-center">
            <Image src="https://i.ibb.co/R4S2M88G/Azadi-Ka-Amrit-Mahotsav-Logo.png" alt="Azadi-Ka-Amrit-Mahotsav-Logo" width={55} height={55} />
          </div>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-blue-500 border-2">
                  <Languages className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                  <span className="text-xs">{content[lang].langName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('hi')}>हिंदी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('bn')}>বাংলা</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('te')}>తెలుగు</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('mr')}>मराठी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ta')}>தமிழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="hidden md:grid md:grid-cols-3 md:items-center h-20">
          <div className="flex items-center gap-4">
            <Image src="https://i.ibb.co/9kdhzXMM/Generated-Image-September-10-2025-7-55-PM.png" alt="eAaharSetu Logo" width={100} height={40} />
            <Image src="https://i.ibb.co/rfzgVKgY/Screenshot-2025-09-16-220853.png" alt="Department of Agriculture Logo" width={150} height={60}/>
          </div>
          <div className="flex justify-center">
            <Image src="https://i.ibb.co/R4S2M88G/Azadi-Ka-Amrit-Mahotsav-Logo.png" alt="Azadi-Ka-Amrit-Mahotsav-Logo" width={70} height={70} />
          </div>
          <div className="flex justify-end">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-blue-500 border-2">
                  <Languages className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                  <span className="text-xs">{content[lang].langName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('hi')}>हिंदी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('bn')}>বাংলা</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('te')}>తెలుగు</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('mr')}>मराठी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ta')}>தமிழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <hr className="w-full border-t-8 border-primary" />
      <div className="wavy-border">
        <main>
          <div className="flex w-full flex-col items-center justify-center p-4">
            <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-center pt-10">
              <div className="mb-4 text-foreground flex items-center gap-4">
                <h1 className="text-5xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-top-4 duration-1000">
                  {pageContent.welcome}
                </h1>
                <Wheat className="h-12 w-12 text-yellow-500" />
              </div>
              <p className="max-w-3xl text-center text-xl text-muted-foreground mb-6 animate-in fade-in slide-in-from-top-6 duration-1000">
                {pageContent.tagline}
              </p>

              <p className="text-lg text-muted-foreground mb-6">{pageContent.chooseRole}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {pageContent.roles.slice(0, 4).map((role, idx) => (
                  <div key={idx} className="group bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center p-5 gap-5 transition-all duration-300 hover:border-2 hover:border-primary hover:outline hover:outline-2 hover:outline-primary hover:-translate-y-1">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-full p-3 flex items-center justify-center border-4 border-blue-100 dark:border-blue-900 group-hover:border-primary/30 transition-all duration-300">
                        <role.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-xl text-foreground mb-1">{role.title}</div>
                      <div className="text-sm text-muted-foreground mb-2">{role.description}</div>
                    </div>
                    <div>
                      <Button asChild size="icon" className="rounded-full bg-primary text-white shadow-md hover:bg-primary/90 group-hover:scale-110 transition-transform duration-300">
                        <Link href={`/dashboard?role=${role.role}&lang=${lang}`} aria-label={`Continue as ${role.title}`}>
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {pageContent.roles.length > 4 && (
                <div className="flex justify-center w-full max-w-4xl mx-auto mb-10">
                  <div className="w-full max-w-md">
                    {pageContent.roles.slice(4).map((role, idx) => (
                      <div key={idx + 4} className="group bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center p-5 gap-5 transition-all duration-300 hover:border-2 hover:border-blue-500 hover:outline hover:outline-2 hover:outline-blue-500 hover:-translate-y-1">
                        <div className="flex-shrink-0">
                          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-full p-3 flex items-center justify-center border-4 border-blue-100 dark:border-blue-900 group-hover:border-blue-400 transition-all duration-300">
                            <role.icon className="h-8 w-8 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-xl text-foreground mb-1">{role.title}</div>
                          <div className="text-sm text-muted-foreground mb-2">{role.description}</div>
                        </div>
                        <div>
                          <Button asChild size="icon" className="rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 group-hover:scale-110 transition-transform duration-300">
                            <Link href={`/dashboard?role=${role.role}&lang=${lang}`} aria-label={`Continue as ${role.title}`}>
                              <ArrowRight className="h-5 w-5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full bg-sky-100 dark:bg-sky-900/30 py-8 md:py-12">
            <div className="relative max-w-5xl mx-auto px-4">
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                  <span className="text-[25vw] md:text-[20vw] lg:text-[18vw] xl:text-[16vw] font-black text-gray-100 dark:text-gray-500/10 opacity-30 leading-none tracking-tighter whitespace-nowrap">
                      #eAaharSetu
                  </span>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-none tracking-tight mb-4 bg-gradient-to-r from-orange-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
                      #eAaharSetu
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-4">
                      <div>
                          <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-green-600">
                              <IndianRupee className="h-6 w-6 md:h-8 md:w-8" />
                              <AnimatedCounter end={17300000} duration={3000} />
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
                              Value Saved this year
                          </p>
                      </div>
                      <div>
                          <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-yellow-600">
                              <Wheat className="h-6 w-6 md:h-8 md:w-8" />
                              <AnimatedCounter end={5000} duration={3000} suffix=" Tons"/>
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
                              Grains Saved
                          </p>
                      </div>
                        <div>
                          <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-blue-600">
                              <Users className="h-6 w-6 md:h-8 md:w-8" />
                              <AnimatedCounter end={25000} duration={3000} />
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
                              People Fed (Est.)
                          </p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="mt-12 w-full text-left animate-in fade-in duration-1000">
              <div className="mb-6 max-w-6xl mx-auto">
                <hr className="w-1/4 border-t-2 border-primary/20" />
              </div>

              <h2 className="text-4xl font-bold text-foreground mb-6 max-w-6xl mx-auto">{pageContent.topPerformers}</h2>
              <div className="relative w-full">
                <Carousel
                  setApi={setPerformerApi}
                  opts={{
                  align: "start",
                  loop: false,
                  slidesToScroll: "auto",
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {topPerformers.map((performer, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-4 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="h-full">
                          <PerformerCard {...performer} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center items-center mt-8 gap-4 w-full">
                    <CarouselPrevious className="rounded-full bg-white shadow-lg border-0 hover:bg-gray-50 w-10 h-10 flex items-center justify-center static" />
                    <CarouselNext className="rounded-full bg-white shadow-lg border-0 hover:bg-gray-50 w-10 h-10 flex items-center justify-center static" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </main>
        
        <section className="w-full bg-sky-100/50 dark:bg-sky-900/20 py-12 mt-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-foreground mb-2">{pageContent.guidelinesTitle}</h2>
                <p className="text-muted-foreground mb-6">{pageContent.guidelinesDescription}</p>
                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {guidelines.map((guideline, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                                <GuidelineCard {...guideline} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[-10px]" />
                    <CarouselNext className="right-[-10px]" />
                </Carousel>
            </div>
        </section>

        <div>
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="w-full bg-gray-50 dark:bg-gray-800/20 py-12 mt-12">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-foreground mb-8">{pageContent.impactTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pageContent.impactStats.slice(0,3).map((stat, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="bg-white dark:bg-gray-700 rounded-full p-4 mb-4 shadow-md border">
                        <stat.icon className="h-10 w-10 text-primary" />
                      </div>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-muted-foreground mt-1 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-12 w-full max-w-5xl text-center mx-auto">
              <div className="flex justify-around items-center gap-8 flex-wrap">
                <div className="flex flex-col items-center space-y-2">
                  <Image src="https://i.ibb.co/bgnrMSGd/Copilot-20250911-210534.png" alt="Encryption" width={163} height={163} />
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <Image src="https://i.ibb.co/BKFshMHK/fci.png" alt="FCI" width={163} height={163} />
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <Image src="https://i.ibb.co/GvMq7x8r/Copilot-20250911-211848.png" alt="MoHFW Guidelines" width={163} height={163} />
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <Image src="https://i.ibb.co/j9LT9FKW/Copilot-20250911-210952.png" alt="Cloud Based" width={163} height={163} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} eAaharSetu. {pageContent.footerRights}</p>
          </div>
      </footer>
    </div>
  );
}
