
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TransportTabs } from "@/components/dashboard/transport-tabs";
import { Suspense } from "react";

export default function TransportPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transport & Logistics</CardTitle>
          <CardDescription>
            Manage all your transport requests, track vehicles, and view your delivery history from one place.
          </CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<div>Loading transport data...</div>}>
        <TransportTabs />
      </Suspense>
    </div>
  );
}
