
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Car, Leaf, MapPin, Milestone, Package, Tractor, Upload, Warehouse } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const formSchema = z.object({
  // Crop Details
  cropName: z.string().min(2, "Crop name must be at least 2 characters."),
  quantity: z.coerce.number().positive("Quantity must be a positive number."),
  unit: z.string().min(1, "Unit is required."),
  harvestDate: z.date(),
  storageDetails: z.string().min(3, "Storage details are required."),
  
  // Pricing & Logistics
  expectedPrice: z.coerce.number().positive("Price must be a positive number."),
  cropLocation: z.string().min(3, "Location is required."),
  transportRequired: z.enum(["yes", "no"]),

  // Quality & Compliance
  qualityCertificate: z.any().optional(),
  farmingPractices: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export function CropInventoryForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      quantity: 0,
      unit: "kg",
      harvestDate: new Date(),
      storageDetails: "On-farm storage, dry and ventilated",
      expectedPrice: 0,
      cropLocation: "",
      transportRequired: "no",
      farmingPractices: "Organic farming practices used",
      additionalNotes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Crop Listed!",
      description: `${values.quantity}${values.unit} of ${values.cropName} has been listed for sale.`,
    });
    form.reset();
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Add a New Crop to Your Inventory</CardTitle>
            <CardDescription>Fill out the details below to list your produce on the marketplace.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Package className="h-5 w-5" /> Crop Details</h3>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 space-y-6">
                            <FormField
                                control={form.control}
                                name="cropName"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Crop Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Organic Tomatoes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity Available</FormLabel>
                                        <FormControl>
                                        <Input type="number" placeholder="100" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit of Measurement</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a unit" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                                <SelectItem value="quintal">Quintals</SelectItem>
                                                <SelectItem value="ton">Tons</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="harvestDate"
                                    render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Harvest Date</FormLabel>
                                        <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                format(field.value, "PPP")
                                                ) : (
                                                <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                            />
                                        </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="storageDetails"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Storage Details</FormLabel>
                                        <FormControl>
                                        <Input placeholder="e.g., On-farm cold storage" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                         <AccordionTrigger>
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Milestone className="h-5 w-5" /> Pricing & Logistics</h3>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 space-y-6">
                             <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="expectedPrice"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expected Price (per unit)</FormLabel>
                                        <FormControl>
                                        <Input type="number" placeholder="150" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cropLocation"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location of Crop</FormLabel>
                                        <FormControl>
                                        <Input placeholder="e.g., Farm Address or GPS coordinates" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                             </div>
                              <FormField
                                    control={form.control}
                                    name="transportRequired"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Transport Required?</FormLabel>
                                        <FormControl>
                                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="yes">Yes, I need transport services.</SelectItem>
                                                    <SelectItem value="no">No, I have my own arrangements.</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                         <AccordionTrigger>
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Leaf className="h-5 w-5" /> Quality & Compliance</h3>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 space-y-6">
                             <FormField
                                control={form.control}
                                name="qualityCertificate"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quality Certificate</FormLabel>
                                    <FormControl>
                                        <Input type="file" {...field} />
                                    </FormControl>
                                    <FormDescription>Upload quality test reports, organic certificates, etc.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="farmingPractices"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Farming & Irrigation Practices</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g., Used drip irrigation, organic pest control methods." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="additionalNotes"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Any other relevant information for the buyer." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Button type="submit" size="lg" className="w-full md:w-auto">
                    <Upload className="mr-2 h-4 w-4" /> Add Crop to Inventory
                </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
