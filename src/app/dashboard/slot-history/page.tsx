
import { FarmerSlotHistory } from "@/components/dashboard/farmer-slot-history";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function SlotHistoryPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Slot Booking History</CardTitle>
          <CardDescription>
            View all your past and upcoming warehouse slot bookings.
          </CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<div>Loading slot history...</div>}>
        <FarmerSlotHistory />
      </Suspense>
    </div>
  );
}
