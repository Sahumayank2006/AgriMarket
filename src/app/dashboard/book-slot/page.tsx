
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CalendarIcon,
  Warehouse,
  Carrot,
  Clock,
  Package,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  warehouse: z.string().min(1, "Please select a warehouse."),
  cropType: z.string().min(1, "Crop type is required."),
  quantity: z.coerce.number().positive("Quantity must be a positive number."),
  unit: z.string().min(1, "Unit is required."),
  bookingDate: z.date(),
});

export default function BookSlotPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouse: "",
      cropType: "",
      quantity: 10,
      unit: "quintal",
      bookingDate: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Slot Booked Successfully!",
      description: `Your slot at ${values.warehouse} for ${values.quantity} ${values.unit} of ${values.cropType.split(" ")[0]} is confirmed.`,
    });
    form.reset();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book a Warehouse Slot</CardTitle>
          <CardDescription>
            Fill in the details to reserve your spot at a selected warehouse.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="warehouse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Warehouse className="h-4 w-4"/>Select Warehouse*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a warehouse from the list..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nashik Cold Storage">
                          Nashik Cold Storage (5km away)
                        </SelectItem>
                        <SelectItem value="Panchvati Warehouse Hub">
                          Panchvati Warehouse Hub (8km away)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cropType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Carrot className="h-4 w-4"/>Crop Type*</FormLabel>
                       <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Or type your crop..." {...field} />
                        </FormControl>
                         <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Suggestions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Tomatoes (टमाटर)">Tomatoes (टमाटर)</SelectItem>
                                <SelectItem value="Onions (प्याज)">Onions (प्याज)</SelectItem>
                                <SelectItem value="Potatoes (आलू)">Potatoes (आलू)</SelectItem>
                                <SelectItem value="Wheat (गेहूँ)">Wheat (गेहूँ)</SelectItem>
                                <SelectItem value="Grapes (अंगूर)">Grapes (अंगूर)</SelectItem>
                                <SelectItem value="Pomegranates (अनार)">Pomegranates (अनार)</SelectItem>
                            </SelectContent>
                        </Select>
                       </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="flex items-center gap-2"><Package className="h-4 w-4"/>Quantity*</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem className="w-[180px] self-end">
                         <FormControl>
                           <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center space-x-4 pt-8"
                            >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="quintal" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Quintal</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="ton" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Ton</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="bookingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2"><CalendarIcon className="h-4 w-4"/>Booking Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
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
              <Button type="submit" size="lg">
                Confirm Booking
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
