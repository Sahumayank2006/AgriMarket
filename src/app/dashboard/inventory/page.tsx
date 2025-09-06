
import { YourInventory } from "@/components/dashboard/your-inventory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Your Inventory</CardTitle>
          <CardDescription>
            Here is a list of your current crop inventory. Keep an eye on items that are nearing their spoilage date.
          </CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<div>Loading inventory...</div>}>
        <YourInventory />
      </Suspense>
    </div>
  );
}
