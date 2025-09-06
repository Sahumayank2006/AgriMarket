
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
            <div className="relative h-64 w-full rounded-md overflow-hidden border">
                <Image 
                    src="https://picsum.photos/seed/map/1200/800"
                    alt="Map of farm location"
                    fill
                    style={{objectFit: 'cover'}}
                    data-ai-hint="map farm"
                />
            </div>
            <div className="mt-4 flex flex-col md:flex-row gap-2">
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
