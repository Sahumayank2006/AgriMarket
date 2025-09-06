
import { DealerOrders } from "@/components/dashboard/dealer-orders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Track and manage all your incoming and outgoing orders in one place.
          </CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<div>Loading orders...</div>}>
        <DealerOrders />
      </Suspense>
    </div>
  );
}
