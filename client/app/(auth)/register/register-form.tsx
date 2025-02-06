"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerForm } from "@/app/validate";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ReqApi from "@/lib/reqApi";
import { HttpError } from "@/lib/http";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.

  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCfPasswordVisibility = () => {
    setShowCfPassword(!showCfPassword);
  };

  const form = useForm<z.infer<typeof registerForm>>({
    resolver: zodResolver(registerForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerForm>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      // Call API
      const res = await ReqApi.register(values);
      console.log(res);
      toast({
        title: "Success",
        description: res.message,
      });
      router.push("/login");
    } catch (error) {
      if (error instanceof HttpError) {
        toast({
          title: "Error",
          description: (error.payload as { message: string }).message,
          variant: "destructive",
        });
        const errors = (
          error.payload as { errors: { field: string; message: string }[] }
        ).errors;
        errors.forEach((error) => {
          form.setError(error.field as keyof z.infer<typeof registerForm>, {
            type: "manual",
            message: error.message,
          });
        });
      }
    }
  }

  return (
    <Form {...form}>
      <div className="flex justify-center text-center bg-gray-100 items-center h-screen">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-8 w-1/2 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Register
          </h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
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
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"} // Toggle input type
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-6 h-6" /> // Icon khi ẩn mật khẩu
                      ) : (
                        <FiEye className="w-6 h-6" /> // Icon khi hiện mật khẩu
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showCfPassword ? "text" : "password"} // Toggle input type
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={toggleCfPasswordVisibility}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                    >
                      {showCfPassword ? (
                        <FiEyeOff className="w-6 h-6" /> // Icon khi ẩn mật khẩu
                      ) : (
                        <FiEye className="w-6 h-6" /> // Icon khi hiện mật khẩu
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Form>
  );
}
