
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
import { CheckCircle, Clock, MoreHorizontal, User, XCircle, Loader2, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, onSnapshot, query, Timestamp, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Slot {
    id: string;
    farmerId: string;
    farmerName: string;
    farmerAvatar: string;
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


export function WarehouseSlotVisibility() {
    const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const isInitialLoad = useRef(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    useEffect(() => {
        const q = query(collection(db, "slots"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const slots: Slot[] = [];
            querySnapshot.forEach((doc) => {
                slots.push({ id: doc.id, ...doc.data() } as Slot);
            });
            setBookedSlots(slots);
            
            if (isInitialLoad.current) {
                isInitialLoad.current = false;
            } else {
                 querySnapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const newSlot = change.doc.data();
                        toast({
                            title: "New Slot Booked!",
                            description: `${newSlot.farmerName} booked a slot for ${newSlot.quantity} ${newSlot.unit} of ${newSlot.cropType}.`
                        });
                    }
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [toast]);

    const handleUpdateStatus = async (id: string, status: "Completed" | "Cancelled") => {
        const slotRef = doc(db, "slots", id);
        try {
            await updateDoc(slotRef, { status });
            toast({
                title: "Slot Updated",
                description: `Booking ${id} has been marked as ${status}.`
            });
        } catch (error) {
            console.error("Error updating slot status:", error);
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "Could not update the slot status. Please try again."
            });
        }
    };
    
    const handleDeleteSlot = async (slot: Slot | null) => {
        if (!slot) return;
        const slotRef = doc(db, "slots", slot.id);
        try {
            await deleteDoc(slotRef);
            
            // Create notification for the farmer
            await addDoc(collection(db, "notifications"), {
                userId: slot.farmerId,
                icon: "XCircle",
                title: "Booking Deleted by Warehouse",
                description: `Your booking for ${slot.quantity} ${slot.unit} of ${slot.cropType} on ${format(slot.bookingDate.toDate(), "PPP")} has been removed by the warehouse manager.`,
                timestamp: serverTimestamp(),
                read: false,
            });

            toast({
                title: "Slot Deleted",
                description: `Booking ${slot.id} has been permanently deleted.`
            });
        } catch (error) {
            console.error("Error deleting slot:", error);
             toast({
                variant: "destructive",
                title: "Deletion Failed",
                description: "Could not delete the slot. Please try again."
            });
        } finally {
            setDialogOpen(false);
            setSelectedSlot(null);
        }
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Slot Bookings</CardTitle>
        <CardDescription>
          Review and manage scheduled drop-offs from farmers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        ) : (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                    <TableCell>{slot.quantity} {slot.unit}</TableCell>
                    <TableCell>{format(slot.bookingDate.toDate(), "PPP")}</TableCell>
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
                            <DropdownMenuItem 
                                disabled={slot.status !== 'Upcoming'}
                                onClick={() => handleUpdateStatus(slot.id, 'Completed')}
                            >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                disabled={slot.status !== 'Upcoming'}
                                onClick={() => handleUpdateStatus(slot.id, 'Cancelled')}
                            >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Slot
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive" onClick={() => setSelectedSlot(slot)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Permanently
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the booking
                        for <span className="font-semibold">{selectedSlot?.farmerName}</span>'s <span className="font-semibold">{selectedSlot?.cropType}</span> and notify them.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setSelectedSlot(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteSlot(selectedSlot)}>
                        Yes, delete it
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        )}
      </CardContent>
    </Card>
  );
}
