
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function DeliveryTrackingPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Delivery Tracking</CardTitle>
          <CardDescription>
            Track your deliveries in real-time.
          </CardDescription>
        </CardHeader>
         <CardContent>
            <p>Delivery tracking functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
