

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
  Loader2,
  Wheat,
  Minus,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
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
import { useContext, useState } from "react";
import { LanguageContext } from "@/contexts/language-context";
import { db } from "@/lib/firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const formSchema = z.object({
  warehouse: z.string().min(1, "Please select a warehouse."),
  cropType: z.string().min(1, "Please select a crop."),
  quantityMode: z.enum(["quantity", "bags"]),
  quantity: z.coerce.number().positive("Quantity must be a positive number."),
  unit: z.string().min(1, "Unit is required."),
  bookingDate: z.date(),
});

const cropOptions = [
    { id: "rice", name: "Rice", image: "https://i.ibb.co/mCcRCBWN/Copilot-20250916-202230.png", en_name: "Rice", hi_name: "चावल" },
    { id: "wheat", name: "Wheat", image: "https://i.ibb.co/hx5gjmcZ/Copilot-20250916-195707.png", en_name: "Wheat", hi_name: "गेहूँ" },
    { id: "maize", name: "Maize", image: "https://i.ibb.co/bX2gG0F/maize.png", en_name: "Maize", hi_name: "मक्का" },
];

const pageContent = {
    en: {
        title: "Book a Warehouse Slot",
        description: "Fill in the details to reserve your spot at a selected warehouse.",
        selectWarehouse: "Select Warehouse*",
        warehousePlaceholder: "Choose a warehouse from the list...",
        warehouse1: "Gwalior Central Warehousing (5km away)",
        warehouse2: "Malwa Agri Storage, Gwalior (8km away)",
        warehouse3: "Chambal Cold Storage, Morena (40km away)",
        selectCrop: "Select Crop*",
        quantity: "Quantity*",
        quintal: "Quintal",
        ton: "Ton",
        bookingDate: "Booking Date*",
        pickDate: "Pick a date",
        confirmBooking: "Confirm Booking",
        bookingSuccessTitle: "Slot Booked Successfully!",
        bookingSuccessDesc: (values: z.infer<typeof formSchema>) => `Your slot at ${values.warehouse} for ${values.quantity} ${values.unit} of ${values.cropType} is confirmed.`,
        bookingErrorTitle: "Booking Failed",
        bookingErrorDesc: "Could not save your booking. Please try again.",
        juteBags: "No. of Jute Bags",
        looseQuantity: "Loose Quantity"
    },
    hi: {
        title: "वेयरहाउस स्लॉट बुक करें",
        description: "चयनित वेयरहाउस में अपना स्थान आरक्षित करने के लिए विवरण भरें।",
        selectWarehouse: "वेयरहाउस चुनें*",
        warehousePlaceholder: "सूची में से एक वेयरहाउस चुनें...",
        warehouse1: "ग्वालियर सेंट्रल वेयरहाउसिंग (5 किमी दूर)",
        warehouse2: "मालवा एग्री स्टोरेज, ग्वालियर (8 किमी दूर)",
        warehouse3: "चंबल कोल्ड स्टोरेज, मुरैना (40 किमी दूर)",
        selectCrop: "फसल चुनें*",
        quantity: "मात्रा*",
        quintal: "क्विंटल",
        ton: "टन",
        bookingDate: "बुकिंग तिथि*",
        pickDate: "एक तारीख चुनें",
        confirmBooking: "बुकिंग की पुष्टि करें",
        bookingSuccessTitle: "स्लॉट सफलतापूर्वक बुक हो गया!",
        bookingSuccessDesc: (values: z.infer<typeof formSchema>) => `${values.warehouse} पर ${values.cropType} के ${values.quantity} ${values.unit} के लिए आपका स्लॉट कन्फर्म हो गया है।`,
        bookingErrorTitle: "बुकिंग विफल",
        bookingErrorDesc: "आपकी बुकिंग सहेजी नहीं जा सकी। कृपया पुनः प्रयास करें।",
        juteBags: "जूट बैग की संख्या",
        looseQuantity: "खुली मात्रा"
    }
}


export default function BookSlotPage() {
  const { lang } = useContext(LanguageContext);
  const t = pageContent[lang];
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouse: "",
      cropType: "",
      quantityMode: "quantity",
      quantity: 10,
      unit: "quintal",
      bookingDate: new Date(),
    },
  });

  const selectedCrop = form.watch("cropType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const farmerId = "farmer-rohan"; 
      const farmerName = "Rohan Gupta";
      const warehouseManagerId = "warehouse-manager";

      await addDoc(collection(db, "slots"), {
        ...values,
        status: "Upcoming",
        farmerId,
        farmerName,
        farmerAvatar: "https://i.ibb.co/QvRcVK86/Copilot-20250915-232755.png"
      });
      
      await addDoc(collection(db, "notifications"), {
          userId: farmerId, 
          icon: "CheckCircle",
          title: "Slot booking confirmed!",
          description: `Your booking at ${values.warehouse} for ${values.quantity} ${values.unit} is confirmed for ${format(values.bookingDate, "PPP")}.`,
          timestamp: serverTimestamp(),
          read: false,
          link: "/dashboard/slot-management?role=farmer"
      });
      
      await addDoc(collection(db, "notifications"), {
          userId: warehouseManagerId,
          icon: "Package",
          title: "New Slot Booking!",
          description: `${farmerName} booked a slot for ${values.quantity} ${values.unit} of ${values.cropType}.`,
          timestamp: serverTimestamp(),
          read: false,
          link: "/dashboard/slot-management?role=green-guardian"
      });

      toast({
        title: t.bookingSuccessTitle,
        description: "Slot has been generated",
      });
      form.reset({
        warehouse: "",
        cropType: "",
        quantityMode: "quantity",
        quantity: 10,
        unit: "quintal",
        bookingDate: new Date(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: "destructive",
        title: t.bookingErrorTitle,
        description: t.bookingErrorDesc,
      });
    } finally {
        setIsLoading(false);
    }
  }

  const handleQuantityChange = (change: number) => {
    form.setValue("quantity", Math.max(1, form.getValues("quantity") + change));
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>
            {t.description}
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
                    <FormLabel className="flex items-center gap-2"><Warehouse className="h-4 w-4"/>{t.selectWarehouse}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.warehousePlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Gwalior Central Warehousing">{t.warehouse1}</SelectItem>
                        <SelectItem value="Malwa Agri Storage, Gwalior">{t.warehouse2}</SelectItem>
                        <SelectItem value="Chambal Cold Storage, Morena">{t.warehouse3}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                     <FormLabel className="flex items-center gap-2"><Carrot className="h-4 w-4"/>{t.selectCrop}</FormLabel>
                     <FormControl>
                        <div className="grid grid-cols-3 gap-4">
                            {cropOptions.map((crop) => (
                                <Card 
                                    key={crop.id}
                                    onClick={() => field.onChange(crop.name)}
                                    className={cn(
                                        "cursor-pointer transition-all duration-200",
                                        selectedCrop === crop.name 
                                            ? "border-primary ring-2 ring-primary"
                                            : "border-border hover:border-primary/50"
                                    )}
                                >
                                    <CardContent className="p-2 flex flex-col items-center justify-center gap-2">
                                        <Image src={crop.image} alt={crop.name} width={100} height={100} className="rounded-md object-cover h-24 w-24" />
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{crop.en_name}</p>
                                            <p className="text-sm font-light text-muted-foreground">{crop.hi_name}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid md:grid-cols-2 gap-6 items-start">
                 <FormField
                    control={form.control}
                    name="quantityMode"
                    render={({ field }) => (
                      <FormItem>
                         <FormLabel className="flex items-center gap-2"><Package className="h-4 w-4"/>{t.quantity}</FormLabel>
                         <FormControl>
                           <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                            >
                                <FormItem>
                                    <RadioGroupItem value="quantity" id="loose" className="peer sr-only" />
                                    <FormLabel htmlFor="loose" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                        {t.looseQuantity}
                                    </FormLabel>
                                </FormItem>
                                 <FormItem>
                                    <RadioGroupItem value="bags" id="bags" className="peer sr-only" />
                                    <FormLabel htmlFor="bags" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                        {t.juteBags}
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="sr-only">{t.quantity}</FormLabel>
                             <div className="flex items-center">
                                <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => handleQuantityChange(-1)}><Minus className="h-4 w-4"/></Button>
                                <FormControl>
                                  <Input type="number" placeholder="10" {...field} className="text-center h-10 rounded-none border-x-0"/>
                                </FormControl>
                                <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => handleQuantityChange(1)}><Plus className="h-4 w-4"/></Button>
                            </div>
                            <FormMessage className="text-center"/>
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem className="w-[120px]">
                                <FormLabel className="sr-only">Unit</FormLabel>
                               <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex items-center space-x-1"
                                >
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <RadioGroupItem value="quintal" id="quintal" className="sr-only peer" />
                                        </FormControl>
                                        <FormLabel htmlFor="quintal" className="flex h-10 w-full items-center justify-center rounded-md border-2 border-muted bg-popover text-sm hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                            {t.quintal}
                                        </FormLabel>
                                    </FormItem>
                                     <FormItem className="flex-1">
                                        <FormControl>
                                            <RadioGroupItem value="ton" id="ton" className="sr-only peer" />
                                        </FormControl>
                                        <FormLabel htmlFor="ton" className="flex h-10 w-full items-center justify-center rounded-md border-2 border-muted bg-popover text-sm hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                            {t.ton}
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
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
                    <FormLabel className="flex items-center gap-2"><CalendarIcon className="h-4 w-4"/>{t.bookingDate}</FormLabel>
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
                              <span>{t.pickDate}</span>
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
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.confirmBooking}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

    