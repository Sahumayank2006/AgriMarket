
import { FinancialServicesTabs } from "@/components/dashboard/financial-services-tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function FinancialServicesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Services</CardTitle>
          <CardDescription>
            Manage your loans, insurance, subsidies, and transactions all in one place.
          </CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<div>Loading financial data...</div>}>
        <FinancialServicesTabs />
      </Suspense>
    </div>
  );
}
