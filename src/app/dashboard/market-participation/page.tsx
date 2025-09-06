import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketParticipationTabs } from "@/components/dashboard/market-participation-tabs";
import { Suspense } from "react";

export default function MarketParticipationPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Marketplace</CardTitle>
          <CardDescription>
            Browse bids, manage your crop listings, and connect with buyers to get the best price for your produce.
          </CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<div>Loading market data...</div>}>
        <MarketParticipationTabs />
      </Suspense>
    </div>
  );
}
