
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
import { useContext } from "react";
import { LanguageContext } from "@/contexts/language-context";

const formSchema = z.object({
  warehouse: z.string().min(1, "Please select a warehouse."),
  cropType: z.string().min(1, "Crop type is required."),
  quantity: z.coerce.number().positive("Quantity must be a positive number."),
  unit: z.string().min(1, "Unit is required."),
  bookingDate: z.date(),
});

const pageContent = {
    en: {
        title: "Book a Warehouse Slot",
        description: "Fill in the details to reserve your spot at a selected warehouse.",
        selectWarehouse: "Select Warehouse*",
        warehousePlaceholder: "Choose a warehouse from the list...",
        warehouse1: "Nashik Cold Storage (5km away)",
        warehouse2: "Panchvati Warehouse Hub (8km away)",
        cropType: "Crop Type*",
        cropPlaceholder: "Or type your crop...",
        suggestions: "Suggestions",
        quantity: "Quantity*",
        quintal: "Quintal",
        ton: "Ton",
        bookingDate: "Booking Date*",
        pickDate: "Pick a date",
        confirmBooking: "Confirm Booking",
        bookingSuccessTitle: "Slot Booked Successfully!",
        bookingSuccessDesc: (values: z.infer<typeof formSchema>) => `Your slot at ${values.warehouse} for ${values.quantity} ${values.unit} of ${values.cropType.split(" ")[0]} is confirmed.`
    },
    hi: {
        title: "वेयरहाउस स्लॉट बुक करें",
        description: "चयनित वेयरहाउस में अपना स्थान आरक्षित करने के लिए विवरण भरें।",
        selectWarehouse: "वेयरहाउस चुनें*",
        warehousePlaceholder: "सूची में से एक वेयरहाउस चुनें...",
        warehouse1: "नासिक कोल्ड स्टोरेज (5 किमी दूर)",
        warehouse2: "पंचवटी वेयरहाउस हब (8 किमी दूर)",
        cropType: "फसल का प्रकार*",
        cropPlaceholder: "या अपनी फसल टाइप करें...",
        suggestions: "सुझाव",
        quantity: "मात्रा*",
        quintal: "क्विंटल",
        ton: "टन",
        bookingDate: "बुकिंग तिथि*",
        pickDate: "एक तारीख चुनें",
        confirmBooking: "बुकिंग की पुष्टि करें",
        bookingSuccessTitle: "स्लॉट सफलतापूर्वक बुक हो गया!",
        bookingSuccessDesc: (values: z.infer<typeof formSchema>) => `${values.warehouse} पर ${values.cropType.split(" ")[0]} के ${values.quantity} ${values.unit} के लिए आपका स्लॉट कन्फर्म हो गया है।`
    }
}


export default function BookSlotPage() {
  const { lang } = useContext(LanguageContext);
  const t = pageContent[lang];
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
      title: t.bookingSuccessTitle,
      description: t.bookingSuccessDesc(values),
    });
    form.reset();
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.warehousePlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nashik Cold Storage">
                          {t.warehouse1}
                        </SelectItem>
                        <SelectItem value="Panchvati Warehouse Hub">
                          {t.warehouse2}
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
                      <FormLabel className="flex items-center gap-2"><Carrot className="h-4 w-4"/>{t.cropType}</FormLabel>
                       <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder={t.cropPlaceholder} {...field} />
                        </FormControl>
                         <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t.suggestions} />
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
                        <FormLabel className="flex items-center gap-2"><Package className="h-4 w-4"/>{t.quantity}</FormLabel>
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
                                    <FormLabel className="font-normal">{t.quintal}</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="ton" />
                                    </FormControl>
                                    <FormLabel className="font-normal">{t.ton}</FormLabel>
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
              <Button type="submit" size="lg">
                {t.confirmBooking}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
