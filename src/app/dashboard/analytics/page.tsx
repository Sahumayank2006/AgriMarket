
"use client";

import { DealerAnalytics } from "@/components/dashboard/dealer-analytics";
import { WarehouseAnalytics } from "@/components/dashboard/warehouse-analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

// This would typically come from user context/auth
// For demo purposes, we'll determine role based on current path or user selection
function getUserRole(): string {
  // In a real app, this would come from authentication context
  // For now, we'll default to green-guardian (warehouse manager)
  return "green-guardian";
}

export default function AnalyticsPage() {
  const userRole = getUserRole();

  // Render different analytics based on user role
  const renderAnalytics = () => {
    switch (userRole) {
      case "green-guardian":
        return <WarehouseAnalytics />;
      case "dealer":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>
                Track your performance, understand your customers, and optimize your sales strategy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading analytics...</div>}>
                <DealerAnalytics />
              </Suspense>
            </CardContent>
          </Card>
        );
      case "admin":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Administrative Analytics</CardTitle>
                <CardDescription>
                  System-wide performance and user metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading analytics...</div>}>
                  <DealerAnalytics />
                </Suspense>
              </CardContent>
            </Card>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Warehouse Operations</h2>
              <WarehouseAnalytics />
            </div>
          </div>
        );
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>
                Track your performance, understand your customers, and optimize your sales strategy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading analytics...</div>}>
                <DealerAnalytics />
              </Suspense>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderAnalytics()}
    </div>
  );
}
