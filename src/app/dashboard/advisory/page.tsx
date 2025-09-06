
import { AdvisoryDashboard } from "@/components/dashboard/advisory-dashboard";
import { Suspense } from "react";

export default function AdvisoryPage() {
  return (
    <Suspense fallback={<div>Loading advisory...</div>}>
      <AdvisoryDashboard />
    </Suspense>
  );
}
