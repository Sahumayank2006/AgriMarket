
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
import { CheckCircle, Clock, Loader2, Warehouse, XCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, onSnapshot, query, Timestamp, where, orderBy } from "firebase/firestore";
import { format } from "date-fns";

interface Slot {
    id: string;
    farmerId: string;
    warehouse: string;
    cropType: string;
    quantity: number;
    unit: string;
    bookingDate: Timestamp;
    status: string;
}

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

export function FarmerSlotHistory() {
    const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, you'd get the current farmer's ID from auth state
        const farmerId = "farmer-rohan"; 

        const q = query(
            collection(db, "slots"), 
            where("farmerId", "==", farmerId),
            orderBy("bookingDate", "desc")
        );
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const slots: Slot[] = [];
            querySnapshot.forEach((doc) => {
                slots.push({ id: doc.id, ...doc.data() } as Slot);
            });
            setBookedSlots(slots);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching slot history: ", error);
            // You might want to show an error message to the user
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
                <CardDescription>A list of all your warehouse bookings.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : bookedSlots.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <p className="font-semibold">No bookings found.</p>
                        <p className="text-sm">You haven't booked any warehouse slots yet.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><Warehouse className="h-4 w-4 inline-block mr-2"/>Warehouse</TableHead>
                                <TableHead>Crop Type</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Booking Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookedSlots.map((slot) => (
                                <TableRow key={slot.id}>
                                    <TableCell className="font-medium">{slot.warehouse}</TableCell>
                                    <TableCell>{slot.cropType}</TableCell>
                                    <TableCell>{slot.quantity} {slot.unit}</TableCell>
                                    <TableCell>{format(slot.bookingDate.toDate(), "PPP")}</TableCell>
                                    <TableCell>{getStatusBadge(slot.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
