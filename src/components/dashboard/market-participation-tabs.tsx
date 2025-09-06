

"use client";

import {
  Gavel,
  Check,
  X,
  PlusCircle,
  Search,
  SlidersHorizontal,
  ChevronDown,
  List,
  History,
  Store,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";

const dealerBids = [
  {
    id: "bid-01",
    dealerName: "Fresh Produce Inc.",
    crop: "Organic Tomatoes",
    quantity: 500,
    offerPrice: 125,
    location: "Kano, Nigeria",
    dealerImage: "https://i.pravatar.cc/150?u=dealer1",
  },
  {
    id: "bid-02",
    dealerName: "Agro Traders",
    crop: "Red Apples",
    quantity: 1000,
    offerPrice: 170,
    location: "Kaduna, Nigeria",
    dealerImage: "https://i.pravatar.cc/150?u=dealer2",
  },
  {
    id: "bid-03",
    dealerName: "Sokoto Greens",
    crop: "Potatoes",
    quantity: 2000,
    offerPrice: 38,
    location: "Sokoto, Nigeria",
    dealerImage: "https://i.pravatar.cc/150?u=dealer3",
  },
   {
    id: "bid-04",
    dealerName: "Corn Connect",
    crop: "Sweet Corn",
    quantity: 800,
    offerPrice: 65,
    location: "Kano, Nigeria",
    dealerImage: "https://i.pravatar.cc/150?u=dealer4",
  },
];

const myListings = [
    { id: "list-01", crop: "Watermelons", quantity: 80, price: 250, status: "active", bids: 3 },
    { id: "list-02", crop: "Organic Carrots", quantity: 250, price: 90, status: "active", bids: 5 },
    { id: "list-03", crop: "Wheat", quantity: 5000, price: 2100, status: "pending", bids: 0 },
];

const salesHistory = [
    { id: "sale-01", crop: "Organic Tomatoes", quantity: 120, price: 120, dealer: "Green Valley Farms", date: "2024-07-15", status: "Completed" },
    { id: "sale-02", crop: "Red Apples", quantity: 300, price: 180, dealer: "Orchard Fresh", date: "2024-07-10", status: "Completed" },
    { id: "sale-03", crop: "Sweet Corn", quantity: 500, price: 60, dealer: "Sunrise Agriculture", date: "2024-07-05", status: "Paid" },
    { id: "sale-04", crop: "Potatoes", quantity: 100, price: 40, dealer: "Green Valley Farms", date: "2024-06-28", status: "In Transit" },
];

function BrowseBids() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Browse Dealer Bids</CardTitle>
        <CardDescription>
          View current bids from dealers for crops you might be selling.
        </CardDescription>
        <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by crop name..." className="pl-10" />
            </div>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filter Bids
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>By Crop Type</DropdownMenuItem>
                <DropdownMenuItem>By Price</DropdownMenuItem>
                <DropdownMenuItem>By Location</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {dealerBids.map((bid) => (
          <Card key={bid.id} className="flex flex-col sm:flex-row items-start gap-4 p-4">
            <Image
              src={bid.dealerImage}
              alt={bid.dealerName}
              width={80}
              height={80}
              className="rounded-full border-2 border-primary/50 aspect-square object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{bid.dealerName}</h3>
              <p className="text-muted-foreground text-sm">Location: {bid.location}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                <div>
                    <p className="text-xs text-muted-foreground">Crop</p>
                    <p className="font-medium">{bid.crop}</p>
                </div>
                 <div>
                    <p className="text-xs text-muted-foreground">Quantity</p>
                    <p className="font-medium">{bid.quantity} kg</p>
                </div>
                 <div>
                    <p className="text-xs text-muted-foreground">Offer Price</p>
                    <p className="font-medium text-primary">₹{bid.offerPrice}/kg</p>
                </div>
              </div>
            </div>
            <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                <Button size="sm" className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Accept
                </Button>
                 <Button size="sm" variant="outline" className="w-full">
                    <Gavel className="mr-2 h-4 w-4" /> Counter Bid
                </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

function ManageListings() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Manage Your Listings</CardTitle>
                    <CardDescription>View, edit, or remove your active crop listings.</CardDescription>
                </div>
                <Button asChild>
                    <Link href="/dashboard/crop-management?role=farmer">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        New Listing
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Crop</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Asking Price</TableHead>
                            <TableHead>Bids</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myListings.map((listing) => (
                            <TableRow key={listing.id}>
                                <TableCell className="font-medium">{listing.crop}</TableCell>
                                <TableCell>{listing.quantity} kg</TableCell>
                                <TableCell>₹{listing.price}/kg</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{listing.bids} new bids</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={listing.status === 'active' ? 'default' : 'outline'} className={listing.status === 'active' ? 'bg-green-600' : ''}>
                                        {listing.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <ChevronDown />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>View Bids</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Listing</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

function SalesHistory() {
     return (
        <Card>
            <CardHeader>
                <CardTitle>Sales History</CardTitle>
                <CardDescription>A record of all your completed and pending transactions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Crop</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Dealer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {salesHistory.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell className="font-medium">{sale.crop}</TableCell>
                                <TableCell>{sale.date}</TableCell>
                                <TableCell>{sale.dealer}</TableCell>
                                <TableCell>₹{(sale.quantity * sale.price).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        sale.status === 'Completed' ? 'default' : 
                                        sale.status === 'Paid' ? 'default' : 
                                        'secondary'
                                    } className={
                                        sale.status === 'Completed' ? 'bg-green-600' : 
                                        sale.status === 'Paid' ? 'bg-blue-600' : ''
                                    }>{sale.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
     )
}


export function MarketParticipationTabs() {
  return (
    <Tabs defaultValue="browse-bids" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
        <TabsTrigger value="browse-bids">
          <Store className="mr-2 h-4 w-4" />
          Browse Bids
        </TabsTrigger>
        <TabsTrigger value="manage-listings">
          <List className="mr-2 h-4 w-4" />
          Manage Your Listings
        </TabsTrigger>
        <TabsTrigger value="sales-history">
          <History className="mr-2 h-4 w-4" />
          Sales History
        </TabsTrigger>
      </TabsList>
      <TabsContent value="browse-bids">
        <BrowseBids />
      </TabsContent>
      <TabsContent value="manage-listings">
        <ManageListings />
      </TabsContent>
      <TabsContent value="sales-history">
        <SalesHistory />
      </TabsContent>
    </Tabs>
  );
}
