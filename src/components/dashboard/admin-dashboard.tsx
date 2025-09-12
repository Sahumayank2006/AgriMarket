"use client";

import {
  Activity,
  Carrot,
  IndianRupee,
  HeartHandshake,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const surplusData = [
  { month: "Jan", tons: 18.6 },
  { month: "Feb", tons: 20.5 },
  { month: "Mar", tons: 23.4 },
  { month: "Apr", tons: 20.0 },
  { month: "May", tons: 22.7 },
  { month: "Jun", tons: 25.1 },
];

const wastePreventedData = [
  { date: "2024-01-01", sold: 59, donated: 20 },
  { date: "2024-01-02", sold: 62, donated: 25 },
  { date: "2024-01-03", sold: 75, donated: 30 },
  { date: "2024-01-04", sold: 45, donated: 15 },
  { date: "2024-01-05", sold: 82, donated: 40 },
  { date: "2024-01-06", sold: 73, donated: 33 },
];

const chartConfig = {
  tons: {
    label: "Surplus (Tons)",
    color: "hsl(var(--chart-1))",
  },
  sold: {
    label: "Sold (Tons)",
    color: "hsl(var(--chart-1))",
  },
  donated: {
    label: "Donated (Tons)",
    color: "hsl(var(--chart-2))",
  },
};

import { WarehouseSensorMonitor } from "./warehouse-sensor-monitor";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,52,31,890</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Surplus Listed
            </CardTitle>
            <Carrot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234 Tons</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Donations Facilitated
            </CardTitle>
            <HeartHandshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573 Tons</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Surplus Trends</CardTitle>
            <CardDescription>Monthly surplus crop listings.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={surplusData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tons" fill="var(--color-tons)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Waste Prevented</CardTitle>
            <CardDescription>
              Daily breakdown of surplus sold vs. donated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart
                data={wastePreventedData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', {day: 'numeric', month: 'short'})} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sold"
                  stroke="var(--color-sold)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="donated"
                  stroke="var(--color-donated)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Sensor Monitoring Section with warehouse selection */}
      <div className="mt-8">
        <WarehouseSensorMonitor />
      </div>
    </div>
  );
}
