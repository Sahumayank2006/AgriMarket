
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FarmLocationMap() {
    const { toast } = useToast();

    const handleSaveLocation = () => {
        toast({
            title: "Location Saved",
            description: "Your farm location has been updated.",
        });
    };

  return (
    <Card className="bg-muted/30">
        <CardHeader>
            <CardTitle>Your Farm Location</CardTitle>
            <CardDescription>
                Pin your exact farm location for accurate logistics and service delivery.
            </CardDescription>
        </CardHeader>
        <CardContent>
             <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 border">
                <Image
                    src="https://picsum.photos/seed/farmmap/800/300"
                    alt="Sample map of a farm location"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="world map"
                />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Enter your farm's address or GPS coordinates" 
                        className="pl-10"
                        defaultValue="123 AgriMarket Lane, Farmer's Ville, Sokoto"
                    />
                </div>
                <Button onClick={handleSaveLocation}>
                    <Save className="mr-2 h-4 w-4"/>
                    Save Location
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}
