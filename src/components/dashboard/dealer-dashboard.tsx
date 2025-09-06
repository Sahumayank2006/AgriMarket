import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CropBrowser } from "./crop-browser";

export default function DealerDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Dealer!</CardTitle>
          <CardDescription>
            Browse available surplus crops, find the best deals, and contribute
            to reducing food waste.
          </CardDescription>
        </CardHeader>
      </Card>
      <CropBrowser />
    </div>
  );
}
