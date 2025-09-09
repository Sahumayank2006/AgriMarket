
import { WarehouseSlotVisibility } from "@/components/dashboard/warehouse-slot-visibility";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function SlotManagementPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Slot Management</CardTitle>
          <CardDescription>
            View and manage all incoming warehouse slot bookings from farmers.
          </CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<div>Loading slots...</div>}>
        <WarehouseSlotVisibility />
      </Suspense>
    </div>
  );
}
