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
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

const Register = () => {
  const schema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    shouldUseNativeValidation: true,
  });

  return (
    <div className="flex-col flex gap-4 items-center mt-20 justify-center">
      <div className="items-center justify-center w-full">
        <h1 className="text-5xl font-semibold text-center">Sign Up</h1>
      </div>

      <Form {...form}>
        <form
          className="self-center justify-self-center space-y-6 bg-white p-6"
          style={{ width: 516 }}
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-gray-700">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-300 focus:ring focus:ring-blue-500"
                    style={{ height: 53 }}
                    placeholder="Enter your full name."
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-gray-700">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-300 focus:ring focus:ring-blue-500"
                    style={{ height: 53 }}
                    placeholder="Re-enter your password."
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
            SIGN UP
          </Button>
          <div
            className="w-full flex justify-between flex-row"
            style={{ color: "#A0ABBB" }}
          >
            <div>
              <div className="flex items-center space-x-2 ">
                <Checkbox
                  id="terms"
                  style={{ color: "#F7F8F9", borderColor: "#A0ABBB" }}
                />
                <Label htmlFor="terms" className="font-semibold text-base">
                  I agree to all terms
                </Label>
              </div>
            </div>
            <h3 className="font-normal underline text-base">
              Already have an account?
            </h3>
          </div>
          <div>
            <div
              className="flex items-center space-x-2"
              style={{ color: "#A0ABBB" }}
            >
              <Checkbox
                id="terms"
                style={{ color: "#F7F8F9", borderColor: "#A0ABBB" }}
              />
              <Label htmlFor="terms" className="font-medium text-base">
                I have read and agreed to the Progressions’ Terms & Conditions
                and Privacy Policy.
              </Label>
            </div>
          </div>
          <div>
            <div
              className="flex items-center space-x-2"
              style={{ color: "#A0ABBB" }}
            >
              <Checkbox
                id="terms"
                style={{ color: "#F7F8F9", borderColor: "#A0ABBB" }}
              />
              <Label htmlFor="terms" className="font-medium text-base">
                I subscribe to advertising and marketing services (Optional).
              </Label>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
