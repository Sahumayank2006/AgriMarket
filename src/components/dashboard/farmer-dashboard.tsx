
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


export default function FarmerDashboard() {
  return (
    <div className="flex flex-col gap-8">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Welcome, Farmer!</CardTitle>
            <CardDescription className="mt-2">
              Here is your one-stop ecosystem to manage your farm, connect with markets, and grow your business.
            </CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard/profile?role=farmer">
              <User className="mr-2 h-4 w-4" />
              Manage Profile
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
