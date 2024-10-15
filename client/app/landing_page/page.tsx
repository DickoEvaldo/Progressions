"use client";
import React from "react";
import Logo from "../components/icon/Logo";
import CodeIcon from "../components/icon/CodeIcon";
import MathIcon from "../components/icon/MathIcon";
import { Button } from "../components/ui/button";
import { useRouter } from "@/node_modules/next/navigation";
import Navbar from "../components/self/Navbar";

const Page = () => {
  const router = useRouter();
  const data = [
    {
      icon: CodeIcon,
      name: "COMP3121",
      position: "top-32 left-1/4 -translate-x-1/2",
      border: "border-yellow-border",
    },
    {
      icon: CodeIcon,
      name: "COMP3311",
      position: "top-32 right-1/4 translate-x-1/2",
      border: "border-green-border",
    },
    {
      icon: MathIcon,
      name: "MATH1231",
      position: "bottom-32 left-1/4 -translate-x-1/2",
      border: "border-blue-border",
    },
    {
      icon: MathIcon,
      name: "MATH1081",
      position: "bottom-32 right-1/4 translate-x-1/2",
      border: "border-purple-border",
    },
    {
      icon: CodeIcon,
      name: "COMP2511",
      position: "top-1/2 left-16 -translate-y-1/2",
      border: "border-orange-border",
    },
    {
      icon: CodeIcon,
      name: "COMP6991",
      position: "top-1/2 right-16 -translate-y-1/2",
      border: "border-dark-button",
    },
    {
      icon: CodeIcon,
      name: "COMP2521",
      position: "top-24 left-1/2 -translate-x-1/2",
      border: "border-dark-button",
    },
    {
      icon: CodeIcon,
      name: "COMP6771",
      position: "bottom-24 left-1/2 -translate-x-1/2",
      border: "border-dark-button",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col self-center mt-40 z-10">
        <Logo className="self-center scale-150 mb-4" />
        <h1 className="text-3xl text-center">
          The Best <span className="text-dark-text">Student Helper</span>
        </h1>
        <h1 className="text-3xl text-center">
          Guidance towards better Career Progression
        </h1>
        <Button
          onClick={() => router.push("/register")}
          className="bg-light-button w-1/2 self-center mt-4"
        >
          Get Started Now
        </Button>
      </div>
      {/* {data.map((item, index) => (
        <div
          key={index}
          className={`px-3 py-3 rounded-2xl border-2 w-40 absolute ${item.position} ${item.border}`}
        >
          <div className="flex flex-row gap-2">
            <item.icon />
            <p className="font-semibold">{item.name}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Page;
