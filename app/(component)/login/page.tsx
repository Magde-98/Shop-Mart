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
import { toast } from "sonner";
import { loginSchema } from "@/app/schema/login.schema";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react"
import { Ilogin } from "@/app/interface/login.interface";

export default function Login() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(value: Ilogin) {

    const res = await signIn('credentials', {
      redirect: false,
      email: value.email,
      password: value.password,
    });

    if (res?.ok) {
      toast.success("Login successful!", { position: "top-center", duration: 2000 });
      router.push('/');
    } else {
      toast.error(res?.error || "Invalid credentials", { position: "top-center", duration: 2000 });
    }


  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Login
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>


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
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
