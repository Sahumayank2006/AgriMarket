
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
import { CheckCircle, Clock, MoreHorizontal, User, XCircle, Loader2, Trash2, Check, Ban, ChevronDown, ChevronUp } from "lucide-react";
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
  AlertDialogTrigger,
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
         case 'accepted':
            return <Badge className="bg-green-600 text-white hover:bg-green-700"><Check className="mr-1 h-3 w-3"/>{status}</Badge>;
        case 'rejected':
            return <Badge variant="destructive"><Ban className="mr-1 h-3 w-3"/>{status}</Badge>;
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
    const [isExpanded, setIsExpanded] = useState(false);
    const INITIAL_DISPLAY_COUNT = 4;

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
                            description: `A farmer has booked a slot. Kindly check.`
                        });
                    }
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [toast]);

    const handleUpdateStatus = async (slot: Slot, status: "Accepted" | "Rejected") => {
        const slotRef = doc(db, "slots", slot.id);
        try {
            await updateDoc(slotRef, { status });

            // Notify farmer
             await addDoc(collection(db, "notifications"), {
                userId: slot.farmerId,
                icon: status === "Accepted" ? "CheckCircle" : "XCircle",
                title: `Booking ${status}!`,
                description: `Your booking for ${slot.quantity} ${slot.unit} of ${slot.cropType} has been ${status.toLowerCase()}.`,
                timestamp: serverTimestamp(),
                read: false,
            });

            toast({
                title: "Slot Updated",
                description: `Booking ${slot.id} has been marked as ${status}.`
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

  const displayedSlots = isExpanded ? bookedSlots : bookedSlots.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreSlots = bookedSlots.length > INITIAL_DISPLAY_COUNT;

  return (
    <Card className="mx-2 sm:mx-0">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">Upcoming Slot Bookings</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Review and manage scheduled drop-offs from farmers.
            </CardDescription>
          </div>
          {hasMoreSlots && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show All ({bookedSlots.length})
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        {loading ? (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        ) : (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <div className="overflow-x-auto">
                <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                    <TableHead className="text-xs sm:text-sm">Farmer</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Crop Type</TableHead>
                    <TableHead className="text-xs sm:text-sm">Quantity</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">Arrival Date</TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-xs sm:text-sm text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
            <TableBody>
                {displayedSlots.map((slot) => (
                <TableRow key={slot.id}>
                    <TableCell className="p-2 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="h-6 w-6 sm:h-9 sm:w-9 flex-shrink-0">
                        <AvatarImage src={slot.farmerAvatar} alt={slot.farmerName} />
                        <AvatarFallback className="text-xs">{slot.farmerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <span className="font-medium text-xs sm:text-sm truncate block">{slot.farmerName}</span>
                            <span className="text-xs text-muted-foreground sm:hidden">{slot.cropType}</span>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell className="p-2 sm:p-4 hidden sm:table-cell text-xs sm:text-sm">{slot.cropType}</TableCell>
                    <TableCell className="p-2 sm:p-4 text-xs sm:text-sm">{slot.quantity} {slot.unit}</TableCell>
                    <TableCell className="p-2 sm:p-4 hidden md:table-cell text-xs sm:text-sm">{format(slot.bookingDate.toDate(), "PPP")}</TableCell>
                    <TableCell className="p-2 sm:p-4">{getStatusBadge(slot.status)}</TableCell>
                    <TableCell className="p-2 sm:p-4 text-right">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem 
                                disabled={slot.status !== 'Upcoming'}
                                onClick={() => handleUpdateStatus(slot, 'Accepted')}
                            >
                            <Check className="mr-2 h-4 w-4" />
                            Accept
                            </DropdownMenuItem>
                             <DropdownMenuItem 
                                className="text-destructive"
                                disabled={slot.status !== 'Upcoming'}
                                onClick={() => handleUpdateStatus(slot, 'Rejected')}
                            >
                            <Ban className="mr-2 h-4 w-4" />
                            Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                View Farmer Profile
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
            </div>
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
