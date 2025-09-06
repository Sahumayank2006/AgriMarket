
import { CropInventoryForm } from "@/components/dashboard/crop-inventory-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CropManagementPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Crop Inventory Management</CardTitle>
          <CardDescription>
            Add new crops to your inventory, manage existing listings, and provide details to attract buyers.
          </CardDescription>
        </CardHeader>
      </Card>
      <CropInventoryForm />
    </div>
  );
}
