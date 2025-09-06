
import { DealerAnalytics } from "@/components/dashboard/dealer-analytics";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Business Analytics</CardTitle>
          <CardDescription>
            Track your performance, understand your customers, and optimize your sales strategy.
          </CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <DealerAnalytics />
      </Suspense>
    </div>
  );
}
