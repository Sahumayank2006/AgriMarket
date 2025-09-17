
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Warehouse, CalendarPlus } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/language-context";
import Image from "next/image";

const pageContent = {
    en: {
        title: "Nearest Warehouses",
        description: "Find available storage facilities near your farm location.",
        available: "Available",
        limited: "Limited Slots",
        full: "Full",
        bookSlot: "Book Slot",
        away: "away"
    },
    hi: {
        title: "निकटतम गोदाम",
        description: "अपने खेत के स्थान के पास उपलब्ध भंडारण सुविधाएं खोजें।",
        available: "उपलब्ध",
        limited: "सीमित स्लॉट",
        full: "भरा हुआ",
        bookSlot: "स्लॉट बुक करें",
        away: "दूर"
    }
}

const mockWarehouses = [
  {
    id: 1,
    name: "Gwalior Central Warehousing",
    distance: "5 km",
    availability: "Available",
    imageUrl: "https://picsum.photos/seed/gwalior-central/400/200",
    dataAiHint: "large warehouse"
  },
  {
    id: 2,
    name: "Malwa Agri Storage, Gwalior",
    distance: "8 km",
    availability: "Limited Slots",
    imageUrl: "https://picsum.photos/seed/malwa-agri/400/200",
    dataAiHint: "modern warehouse"
  },
  {
    id: 3,
    name: "Chambal Cold Storage, Morena",
    distance: "40 km",
    availability: "Full",
    imageUrl: "https://picsum.photos/seed/chambal-cold/400/200",
    dataAiHint: "cold storage"
  },
];

export function NearestWarehouses() {
  const { lang } = useContext(LanguageContext);
  const t = pageContent[lang];

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
        case "Available": return t.available;
        case "Limited Slots": return t.limited;
        case "Full": return t.full;
        default: return availability;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Warehouse /> {t.title}</CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockWarehouses.map((warehouse) => (
          <Card key={warehouse.id} className="overflow-hidden">
            <Link href={`/dashboard/book-slot?role=farmer&lang=${lang}&warehouse=${warehouse.id}`} passHref>
                <div className="relative h-32 w-full cursor-pointer">
                    <Image
                        src={warehouse.imageUrl}
                        alt={warehouse.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 hover:scale-105"
                        data-ai-hint={warehouse.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute top-2 left-2">
                         <Badge 
                            variant={
                                warehouse.availability === "Available" ? "default" :
                                warehouse.availability === "Limited Slots" ? "secondary" : "destructive"
                            }
                            className={
                                warehouse.availability === "Available" ? "bg-green-600 text-white" :
                                warehouse.availability === "Limited Slots" ? "bg-amber-500 text-white" : ""
                            }
                        >
                            {getAvailabilityText(warehouse.availability)}
                        </Badge>
                    </div>
                </div>
            </Link>
            <div className="p-4">
              <h4 className="font-semibold">{warehouse.name}</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Approx. {warehouse.distance} {t.away}
              </p>
              <Button 
                asChild 
                size="sm"
                className="w-full mt-4"
                disabled={warehouse.availability === "Full"}
              >
                <Link href={`/dashboard/book-slot?role=farmer&lang=${lang}&warehouse=${warehouse.id}`}>
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    {t.bookSlot}
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
