
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee, Package, Users, ShoppingCart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";

const salesData = [
  { month: "Jan", revenue: 400000 },
  { month: "Feb", revenue: 300000 },
  { month: "Mar", revenue: 500000 },
  { month: "Apr", revenue: 450000 },
  { month: "May", revenue: 600000 },
  { month: "Jun", revenue: 700000 },
];

const customerData = [
    { month: "Jan", new: 20, returning: 15 },
    { month: "Feb", new: 25, returning: 18 },
    { month: "Mar", new: 30, returning: 22 },
    { month: "Apr", new: 28, returning: 25 },
    { month: "May", new: 35, returning: 30 },
    { month: "Jun", new: 40, returning: 32 },
];

const topProducts = [
    { id: 1, name: "Organic Tomatoes", sold: 1200, revenue: 144000 },
    { id: 2, name: "Red Apples", sold: 800, revenue: 136000 },
    { id: 3, name: "Sweet Corn", sold: 2500, revenue: 162500 },
    { id: 4, name: "Potatoes", sold: 5000, revenue: 200000 },
    { id: 5, name: "Oranges", sold: 600, revenue: 150000 },
]

export function DealerAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹29,50,000</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,100 units</div>
            <p className="text-xs text-muted-foreground">+12.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+178</div>
            <p className="text-xs text-muted-foreground">+25% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 awaiting dispatch</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue breakdown.</CardDescription>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis unit="₹" tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value as number)} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue (₹)" />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
            <CardDescription>New vs. Returning customers.</CardDescription>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="new" stroke="hsl(var(--chart-1))" name="New Customers"/>
                <Line type="monotone" dataKey="returning" stroke="hsl(var(--chart-2))" name="Returning Customers" />
                </LineChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Your most popular items by revenue.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Units Sold</TableHead>
                        <TableHead>Total Revenue</TableHead>
                        <TableHead>Inventory Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.sold} kg</TableCell>
                            <TableCell>₹{product.revenue.toLocaleString('en-IN')}</TableCell>
                            <TableCell><Badge>In Stock</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
