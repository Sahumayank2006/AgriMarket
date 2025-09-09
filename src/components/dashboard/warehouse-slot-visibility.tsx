
"use client";

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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CheckCircle, Clock, MoreHorizontal, User, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const bookedSlots = [
  {
    id: "SLOT-001",
    farmerName: "Rohan Gupta",
    farmerAvatar: "https://i.pravatar.cc/150?u=rohan",
    cropType: "Tomatoes (टमाटर)",
    quantity: "10 Quintal",
    bookingDate: "2024-08-10",
    status: "Upcoming",
  },
  {
    id: "SLOT-002",
    farmerName: "Priya Rao",
    farmerAvatar: "https://i.pravatar.cc/150?u=priya",
    cropType: "Onions (प्याज)",
    quantity: "25 Quintal",
    bookingDate: "2024-08-11",
    status: "Upcoming",
  },
  {
    id: "SLOT-003",
    farmerName: "Vijay Kumar",
    farmerAvatar: "https://i.pravatar.cc/150?u=vijay",
    cropType: "Potatoes (आलू)",
    quantity: "5 Ton",
    bookingDate: "2024-08-08",
    status: "Completed",
  },
  {
    id: "SLOT-004",
    farmerName: "Amit Deshmukh",
    farmerAvatar: "https://i.pravatar.cc/150?u=amit",
    cropType: "Grapes (अंगूर)",
    quantity: "8 Quintal",
    bookingDate: "2024-08-12",
    status: "Upcoming",
  },
   {
    id: "SLOT-005",
    farmerName: "Meera Patel",
    farmerAvatar: "https://i.pravatar.cc/150?u=meera",
    cropType: "Pomegranates (अनार)",
    quantity: "12 Quintal",
    bookingDate: "2024-08-09",
    status: "Cancelled",
  },
];

const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
            return <Badge className="bg-green-600 text-white hover:bg-green-700"><CheckCircle className="mr-1 h-3 w-3"/>{status}</Badge>;
        case 'upcoming':
            return <Badge className="bg-blue-500 text-white hover:bg-blue-600"><Clock className="mr-1 h-3 w-3"/>{status}</Badge>;
        case 'cancelled':
            return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3"/>{status}</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}


export function WarehouseSlotVisibility() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Slot Bookings</CardTitle>
        <CardDescription>
          Review and manage scheduled drop-offs from farmers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmer</TableHead>
              <TableHead>Crop Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Arrival Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookedSlots.map((slot) => (
              <TableRow key={slot.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={slot.farmerAvatar} alt={slot.farmerName} />
                      <AvatarFallback>{slot.farmerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{slot.farmerName}</span>
                  </div>
                </TableCell>
                <TableCell>{slot.cropType}</TableCell>
                <TableCell>{slot.quantity}</TableCell>
                <TableCell>{slot.bookingDate}</TableCell>
                <TableCell>{getStatusBadge(slot.status)}</TableCell>
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
                        <User className="mr-2 h-4 w-4" />
                        View Farmer Profile
                      </DropdownMenuItem>
                       <DropdownMenuItem disabled={slot.status !== 'Upcoming'}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled={slot.status !== 'Upcoming'} className="text-destructive">
                         <XCircle className="mr-2 h-4 w-4" />
                        Cancel Slot
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
