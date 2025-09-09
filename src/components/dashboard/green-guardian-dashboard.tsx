
"use client";

import {
  Package,
  Thermometer,
  Droplets,
  Users as UsersIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { WarehouseSlotVisibility } from "./warehouse-slot-visibility";


const sensorData = [
  { time: "00:00", temperature: 19.5, humidity: 62 },
  { time: "02:00", temperature: 19.2, humidity: 63 },
  { time: "04:00", temperature: 19.0, humidity: 64 },
  { time: "06:00", temperature: 18.8, humidity: 65 },
  { time: "08:00", temperature: 19.1, humidity: 63 },
  { time: "10:00", temperature: 20.0, humidity: 60 },
  { time: "12:00", temperature: 20.5, humidity: 58 },
];

const stockData = [
    { name: "Vegetables", in_stock: 4000, incoming: 2400, outgoing: 2400 },
    { name: "Fruits", in_stock: 3000, incoming: 1398, outgoing: 2210 },
    { name: "Grains", in_stock: 2000, incoming: 9800, outgoing: 2290 },
    { name: "Dairy", in_stock: 2780, incoming: 3908, outgoing: 2000 },
];


const sensorChartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-2))",
  },
};

export default function GreenGuardianDashboard() {
  return (
    <div className="space-y-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11,780 kg</div>
            <p className="text-xs text-muted-foreground">Across 4 categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19.4 °C</div>
            <p className="text-xs text-muted-foreground">Within optimal range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Humidity
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62.1 %</div>
            <p className="text-xs text-muted-foreground">Stable conditions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Workforce
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Active</div>
            <p className="text-xs text-muted-foreground">
              3 tasks pending
            </p>
          </CardContent>
        </Card>
      </div>

       <WarehouseSlotVisibility />

       <Card>
        <CardHeader>
          <CardTitle>Real-time Sensor Dashboard</CardTitle>
          <CardDescription>
            Monitoring temperature and humidity over the last 12 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={sensorChartConfig} className="h-[300px] w-full">
            <LineChart data={sensorData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="var(--color-temperature)" strokeWidth={2} dot={true} />
              <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="var(--color-humidity)" strokeWidth={2} dot={true} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Stock Level Tracker</CardTitle>
              <CardDescription>Current, incoming, and outgoing stock levels by category.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="in_stock" fill="hsl(var(--chart-1))" name="In Stock (kg)" />
                <Bar dataKey="incoming" fill="hsl(var(--chart-2))" name="Incoming (kg)" />
                <Bar dataKey="outgoing" fill="hsl(var(--chart-3))" name="Outgoing (kg)" />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
      </Card>
    </div>
  );
}
