
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

export function SlotBooking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Slot Booking</CardTitle>
        <CardDescription>
          Schedule a time to drop off your produce at a nearby warehouse to
          ensure space and reduce wait times.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">
            Click the button below to find a warehouse and book your slot.
        </p>
        <Button asChild size="lg">
            <Link href="/dashboard/book-slot?role=farmer">
                <CalendarPlus className="mr-2 h-5 w-5" />
                Book a New Slot
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
