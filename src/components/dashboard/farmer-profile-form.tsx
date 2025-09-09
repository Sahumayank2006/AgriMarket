
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileText, User, Fingerprint, Phone } from "lucide-react";

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
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  mobileNumber: z.string().length(10, "Mobile number must be 10 digits."),
  aadhaarNumber: z.string().length(12, "Aadhaar number must be 12 digits."),
  idProof: z.any().optional(),
});

export function FarmerProfileForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      aadhaarNumber: "",
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
            <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" />Full Name*</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2"><Phone className="h-4 w-4" />Mobile Number*</FormLabel>
                        <FormControl>
                        <Input type="tel" placeholder="Enter 10-digit mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="aadhaarNumber"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2"><Fingerprint className="h-4 w-4" />Aadhaar Number*</FormLabel>
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
            
            <Button type="submit" size="lg">
              <FileText className="mr-2 h-4 w-4" /> Save Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
