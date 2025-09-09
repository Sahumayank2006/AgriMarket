
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
} from "lucide-react";
import Link from "next/link";
import { FarmLocationMap } from "./farm-location-map";
import { NearestWarehouses } from "./nearest-warehouses";
import { SlotBooking } from "./slot-booking";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/language-context";

const pageContent = {
    en: {
        welcome: "Welcome, Farmer!",
        description: "Here is your one-stop ecosystem to manage your farm, connect with markets, and grow your business.",
        manageProfile: "Manage Profile",
    },
    hi: {
        welcome: "किसान, आपका स्वागत है!",
        description: "यह आपके खेत का प्रबंधन करने, बाजारों से जुड़ने और अपने व्यवसाय को बढ़ाने के लिए आपका वन-स्टॉप इकोसिस्टम है।",
        manageProfile: "प्रोफ़ाइल प्रबंधित करें",
    }
}


export default function FarmerDashboard() {
  const { lang } = useContext(LanguageContext);
  const t = pageContent[lang];

  return (
    <div className="flex flex-col gap-8">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t.welcome}</CardTitle>
            <CardDescription className="mt-2">
              {t.description}
            </CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link href={`/dashboard/profile?role=farmer&lang=${lang}`}>
              <User className="mr-2 h-4 w-4" />
              {t.manageProfile}
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
            <FarmLocationMap />
            <NearestWarehouses />
        </CardContent>
      </Card>
      
      <SlotBooking />
      
    </div>
  );
}
