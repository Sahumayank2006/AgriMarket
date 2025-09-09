
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
    name: "Nashik Cold Storage",
    distance: "5 km",
    availability: "Available",
  },
  {
    id: 2,
    name: "Panchvati Warehouse Hub",
    distance: "8 km",
    availability: "Limited Slots",
  },
  {
    id: 3,
    name: "Sinnar Agri-Storage",
    distance: "15 km",
    availability: "Full",
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
          <div key={warehouse.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <h4 className="font-semibold">{warehouse.name}</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Approx. {warehouse.distance} {t.away}
              </p>
            </div>
            <div className="flex items-center gap-4">
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
                <Button 
                    asChild 
                    size="sm"
                    disabled={warehouse.availability === "Full"}
                >
                    <Link href={`/dashboard/book-slot?role=farmer&lang=${lang}`}>
                         <CalendarPlus className="mr-2 h-4 w-4" />
                         {t.bookSlot}
                    </Link>
                </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
