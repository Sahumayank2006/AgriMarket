
"use client";

import { FarmerProfileForm } from "@/components/dashboard/farmer-profile-form";
import { WarehouseManagerProfileForm } from "@/components/dashboard/warehouse-manager-profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { User, Building } from "lucide-react";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "farmer";

  const getProfileContent = () => {
    switch (role) {
      case "green-guardian":
        return {
          title: "Warehouse Manager Profile",
          description: "Manage your professional details, warehouse information, and notification preferences.",
          icon: Building,
          component: <WarehouseManagerProfileForm />
        };
      case "farmer":
      default:
        return {
          title: "Farmer Profile", 
          description: "Please fill in the following basic details accurately. Fields marked with * are mandatory.",
          icon: User,
          component: <FarmerProfileForm />
        };
    }
  };

  const { title, description, icon: Icon, component } = getProfileContent();

  return (
    <div className="space-y-6">
      {component}
    </div>
  );
}
