
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { CalendarPlus } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/language-context";

const pageContent = {
    en: {
        title: "Warehouse Slot Booking",
        description: "Schedule a time to drop off your produce at a nearby warehouse to ensure space and reduce wait times.",
        buttonText: "Book a New Slot",
        cta: "Click the button below to find a warehouse and book your slot."
    },
    hi: {
        title: "वेयरहाउस स्लॉट बुकिंग",
        description: "जगह सुनिश्चित करने और प्रतीक्षा समय कम करने के लिए अपने उत्पादों को पास के गोदाम में छोड़ने का समय निर्धारित करें।",
        buttonText: "एक नया स्लॉट बुक करें",
        cta: "गोदाम खोजने और अपना स्लॉट बुक करने के लिए नीचे दिए गए बटन पर क्लिक करें।"
    }
}

export function SlotBooking() {
  const { lang } = useContext(LanguageContext);
  const t = pageContent[lang];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">
            {t.cta}
        </p>
        <Button asChild size="lg">
            <Link href={`/dashboard/book-slot?role=farmer&lang=${lang}`}>
                <CalendarPlus className="mr-2 h-5 w-5" />
                {t.buttonText}
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
