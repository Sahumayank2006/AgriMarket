
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Warehouse /> Nearest Warehouses</CardTitle>
        <CardDescription>
          Find available storage facilities near your farm location.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockWarehouses.map((warehouse) => (
          <div key={warehouse.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <h4 className="font-semibold">{warehouse.name}</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Approx. {warehouse.distance} away
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
                    {warehouse.availability}
                </Badge>
                <Button 
                    asChild 
                    size="sm"
                    disabled={warehouse.availability === "Full"}
                >
                    <Link href="/dashboard/book-slot?role=farmer">
                         <CalendarPlus className="mr-2 h-4 w-4" />
                         Book Slot
                    </Link>
                </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
