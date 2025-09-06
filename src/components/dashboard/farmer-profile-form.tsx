
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Banknote, FileText, Landmark, MapPin, Tractor, User, Upload, Fingerprint, Mail, Phone, Bot } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  mobileNumber: z.string().length(10, "Mobile number must be 10 digits."),
  emailAddress: z.string().email("Invalid email address.").optional().or(z.literal('')),
  aadhaarNumber: z.string().length(12, "Aadhaar number must be 12 digits."),
  idProof: z.any().optional(),

  // Farm Information
  farmLocation: z.string().min(3, "Farm location is required."),
  farmSize: z.coerce.number().positive("Farm size must be a positive number."),
  farmSizeUnit: z.string(),
  soilType: z.string().min(1, "Soil type is required."),

  // Financial Information
  bankName: z.string().min(2, "Bank name is required."),
  accountNumber: z.string().min(5, "Account number is required."),
  ifscCode: z.string().min(5, "IFSC code is required."),
  upiId: z.string().optional(),
});

export function FarmerProfileForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      emailAddress: "",
      aadhaarNumber: "",
      farmLocation: "",
      farmSize: 0,
      farmSizeUnit: "acres",
      soilType: "loam",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Profile Saved!",
      description: "Your profile information has been successfully updated.",
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Accordion type="multiple" defaultValue={["personal", "farm", "financial"]} className="w-full">
              <AccordionItem value="personal">
                <AccordionTrigger>
                  <h3 className="text-lg font-semibold flex items-center gap-2"><User className="h-5 w-5" /> Personal Information</h3>
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number*</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter 10-digit mobile number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address (Optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your-email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="aadhaarNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aadhaar Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter 12-digit Aadhaar number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idProof"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload ID Proof*</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
                          </FormControl>
                          <FormDescription>Upload Aadhaar or other valid government ID.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="farm">
                <AccordionTrigger>
                  <h3 className="text-lg font-semibold flex items-center gap-2"><Tractor className="h-5 w-5" /> Farm Information</h3>
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-6">
                  <FormField
                    control={form.control}
                    name="farmLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Location*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter GPS coordinates or postal address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="farmSize"
                            render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Farm Size*</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="e.g., 10" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="farmSizeUnit"
                            render={({ field }) => (
                                <FormItem className="w-[120px] self-end">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Unit" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="acres">Acres</SelectItem>
                                            <SelectItem value="hectares">Hectares</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                      control={form.control}
                      name="soilType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soil Type*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select soil type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="clay">Clay</SelectItem>
                              <SelectItem value="sandy">Sandy</SelectItem>
                              <SelectItem value="loam">Loam</SelectItem>
                              <SelectItem value="alluvial">Alluvial</SelectItem>
                              <SelectItem value="black">Black</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="financial">
                <AccordionTrigger>
                  <h3 className="text-lg font-semibold flex items-center gap-2"><Landmark className="h-5 w-5" /> Financial Information</h3>
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="bankName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Name*</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter name of your bank" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="accountNumber"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Account Number*</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter your bank account number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                   </div>
                   <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                                control={form.control}
                                name="ifscCode"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>IFSC Code*</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Enter your branch IFSC code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        <FormField
                                control={form.control}
                                name="upiId"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UPI ID (Optional)</FormLabel>
                                    <FormControl>
                                    <Input placeholder="yourname@upi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                   </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button type="submit" size="lg">
              <FileText className="mr-2 h-4 w-4" /> Save Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
