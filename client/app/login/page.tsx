"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

const Login = () => {
  const schema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
    shouldUseNativeValidation: true,
  });

  return (
    <div className="flex-col flex gap-4 items-center mt-20 justify-center">
      <div className="items-center justify-center w-full">
        <h1 className="text-5xl font-semibold text-center">Log In</h1>
      </div>

      <Form {...form}>
        <form
          className="self-center justify-self-center space-y-6 bg-white p-6"
          style={{ width: 516 }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-gray-700">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-300 focus:ring focus:ring-blue-500"
                    style={{ height: 53 }}
                    placeholder="Enter your email address."
                    {...field}
                    type="text"
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
                <FormLabel className="font-normal text-gray-700">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-300 focus:ring focus:ring-blue-500"
                    style={{ height: 53 }}
                    placeholder="Enter your password."
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full rounded-xl font-semibold bg-light-button"
            style={{ height: 53 }}
          >
            Login
          </Button>
          <h3
            className="underline font-medium text-base text-center cursor-pointer"
            style={{ color: "#A0ABBB" }}
            onClick={() => router.push("/register")}
          >
            Don't have an account yet
          </h3>
        </form>
      </Form>
    </div>
  );
};

export default Login;
