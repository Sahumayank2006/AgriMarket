
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";


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
