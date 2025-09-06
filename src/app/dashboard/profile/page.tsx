
import { FarmerProfileForm } from "@/components/dashboard/farmer-profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Farmer Profile</CardTitle>
          <CardDescription>
            Please fill in the following basic details accurately. Fields marked with * are mandatory.
          </CardDescription>
        </CardHeader>
      </Card>
      <FarmerProfileForm />
    </div>
  );
}
