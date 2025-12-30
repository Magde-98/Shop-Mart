"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { checkoutSchema } from "@/app/schema/checkout.schema";
import { Icheckout } from "@/app/interface/checkout.interface";
import { useParams } from "next/navigation";
import { payProducts } from "@/app/api/payment/checkout.api";

export default function Checkout() {
  const { id }: { id: string } = useParams();

  const form = useForm<Icheckout>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handlePayment(values: Icheckout) {
    try {
      const data = await payProducts(values, id);

      if (data?.status === "success") {
        toast.success("Order placed successfully", {
          position: "top-center",
          duration: 2000,
        });

        setTimeout(() => {
          window.location.href = data.session.url;
        }, 1500);
      } else {
        toast.error("Payment failed", {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Payment failed",
          {
            position: "top-center",
            duration: 2000,
          }
        );
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
          duration: 2000,
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Checkout
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePayment)}
            className="space-y-4"
          >
       
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Details</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street, building, apartment..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

    
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Cairo, Giza..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-md"
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
