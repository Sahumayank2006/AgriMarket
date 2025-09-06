import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CropUpload } from "@/components/dashboard/crop-upload";
import { SpoilagePrediction } from "@/components/dashboard/spoilage-prediction";
import { MealPlanner } from "@/components/dashboard/meal-planner";
import { Sustainability } from "@/components/dashboard/sustainability";
import { Carrot, Sparkles, Library, Leaf } from "lucide-react";

export default function FarmerDashboard() {
  return (
    <div className="flex flex-col gap-8">
       <Card>
        <CardHeader>
          <CardTitle>Welcome, Farmer!</CardTitle>
          <CardDescription>
            Here are your tools to manage crops, reduce waste, and maximize your yield's potential.
          </CardDescription>
        </CardHeader>
      </Card>
      <Tabs defaultValue="crop-upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="crop-upload">
            <Carrot className="mr-2 h-4 w-4" />
            Crop Upload
          </TabsTrigger>
          <TabsTrigger value="spoilage-prediction">
            <Sparkles className="mr-2 h-4 w-4" />
            Spoilage Prediction
          </TabsTrigger>
          <TabsTrigger value="meal-planner">
            <Library className="mr-2 h-4 w-4" />
            Surplus Meals
          </TabsTrigger>
          <TabsTrigger value="sustainability">
            <Leaf className="mr-2 h-4 w-4" />
            Sustainability
          </TabsTrigger>
        </TabsList>
        <TabsContent value="crop-upload">
          <CropUpload />
        </TabsContent>
        <TabsContent value="spoilage-prediction">
          <SpoilagePrediction />
        </TabsContent>
        <TabsContent value="meal-planner">
          <MealPlanner />
        </TabsContent>
        <TabsContent value="sustainability">
          <Sustainability />
        </TabsContent>
      </Tabs>
    </div>
  );
}
