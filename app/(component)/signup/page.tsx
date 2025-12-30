"use client";

import { useForm } from "react-hook-form";
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/schema/register.schema";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Register } from "@/app/interface/login.interface";

export default function Signup() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(signupSchema),
  });

  async function handleRegister(values: Register) {
    try {
      const response = await axios.post<{ message: string }>(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (response.data.message === "success") {
        toast.success("Account created successfully!", {
          position: "top-center",
          duration: 2000,
        });
        router.push("/login");
      }
    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "There is an error", {
          position: "top-center",
          duration: 2000,
        });
      } else if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-center",
          duration: 2000,
        });
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
          Register Now
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)}>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className="mb-2.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="mb-2.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      className="mb-2.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      className="mb-2.5"
                      {...field}
                    />
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
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      className="mb-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-6 text-xl bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-md"
            >
              Create Account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
