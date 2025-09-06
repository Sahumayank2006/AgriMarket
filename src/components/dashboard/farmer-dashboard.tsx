
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carrot,
  IndianRupee,
  LineChart,
  Package,
  Truck,
  Bell,
  MapPin,
  Users,
  ShieldQuestion,
  PlusCircle,
  ArrowRight,
  User,
} from "lucide-react";
import Link from "next/link";
import { FarmLocationMap } from "./farm-location-map";

const featureCards = [
  {
    title: "Crop Inventory Management",
    description: "Add, update, and manage your crop listings. Upload quality certificates to build buyer trust.",
    icon: Carrot,
    buttonText: "Manage Inventory",
    href: "/dashboard/crop-management?role=farmer",
  },
  {
    title: "Market Participation",
    description: "Browse dealer bids, place your crops for sale, and accept offers from buyers.",
    icon: LineChart,
    buttonText: "Go to Market",
    href: "/dashboard/market-participation?role=farmer",
  },
  {
    title: "Transport & Logistics",
    description: "Request transport services to move your produce to warehouses or buyers.",
    icon: Truck,
    buttonText: "Schedule Transport",
    href: "/dashboard/transport?role=farmer",
  },
  {
    title: "Advisory & Alerts",
    description: "Get AI-driven advice on farming, weather alerts, and government scheme updates.",
    icon: Bell,
    buttonText: "View Advisory",
    href: "#",
  },
  {
    title: "Financial Services",
    description: "Apply for loans, manage insurance, and track your payments and subsidies.",
    icon: IndianRupee,
    buttonText: "Manage Finances",
    href: "#",
  },
  {
    title: "Community & Learning",
    description: "Join farmer forums, access training modules, and grow your knowledge.",
    icon: Users,
    buttonText: "Join Community",
    href: "#",
  },
];


export default function FarmerDashboard() {
  return (
    <div className="flex flex-col gap-8">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Welcome, Farmer!</CardTitle>
            <CardDescription className="mt-2">
              Here is your one-stop ecosystem to manage your farm, connect with markets, and grow your business.
            </CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard/profile?role=farmer">
              <User className="mr-2 h-4 w-4" />
              Manage Profile
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
            <FarmLocationMap />
        </CardContent>
      </Card>
      
      <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Your Farming Toolkit</h2>
            <Button asChild>
              <Link href="/dashboard/crop-management?role=farmer">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Crop
              </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <feature.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <CardTitle>{feature.title}</CardTitle>
                            <CardDescription className="mt-1">{feature.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={feature.href}>
                            {feature.buttonText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
