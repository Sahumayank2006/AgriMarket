
"use client";

import {
  MoreHorizontal,
  Search,
  ChevronDown,
  FileText,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const orders = [
  {
    id: "ORD-001",
    customer: "Green Valley Farms",
    date: "2024-08-01",
    total: "₹25,000",
    status: "Processing",
    items: "50kg Tomatoes, 20kg Potatoes",
  },
  {
    id: "ORD-002",
    customer: "Sunrise Agriculture",
    date: "2024-07-30",
    total: "₹42,000",
    status: "Shipped",
    items: "100kg Sweet Corn",
  },
  {
    id: "ORD-003",
    customer: "Orchard Fresh",
    date: "2024-07-28",
    total: "₹18,000",
    status: "Delivered",
    items: "100kg Red Apples",
  },
  {
    id: "ORD-004",
    customer: "Green Valley Farms",
    date: "2024-07-25",
    total: "₹8,500",
    status: "Cancelled",
    items: "200kg Onions",
  },
   {
    id: "ORD-005",
    customer: "Nagpur Greens",
    date: "2024-08-02",
    total: "₹12,500",
    status: "Pending",
    items: "150kg Oranges",
  },
];

const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered':
            return <Badge className="bg-green-600 text-white hover:bg-green-700"><CheckCircle className="mr-1 h-3 w-3"/>{status}</Badge>;
        case 'processing':
            return <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">{status}</Badge>;
        case 'shipped':
            return <Badge variant="secondary" className="bg-yellow-500 text-white hover:bg-yellow-600"><Truck className="mr-1 h-3 w-3"/>{status}</Badge>;
        case 'cancelled':
            return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3"/>{status}</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}


export function DealerOrders() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                Manage and review all your customer orders.
                </CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                 <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Order ID..." className="pl-10" />
                </div>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        Status <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Processing</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  {getStatusBadge(order.status)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                         <Truck className="mr-2 h-4 w-4" />
                        Track Order
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

