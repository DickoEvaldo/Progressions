"use client";
import React from "react";
import Logo from "../components/icon/Logo";
import CodeIcon from "../components/icon/CodeIcon";
import MathIcon from "../components/icon/MathIcon";
import { Button } from "../components/ui/button";
import { useRouter } from "@/node_modules/next/navigation";
import Navbar from "../components/self/Navbar";
import bento from "../assets/Bento.png";
import Image from "@/node_modules/next/image";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col gap-4 px-8 mb-40">
          <p className="text-6xl font-bold">
            Your Personalized <br /> UNSW Journey <br /> Starts Here
          </p>
          <p className="text-xl">
            Navigate Your Degree with Tailored Course Roadmaps, Skill Tracking,
            and Career Insights
          </p>
          <Button className="bg-light-button self-start font-bold rounded-2xl text-xl">
            Get Started Now
          </Button>
        </div>
        <div className="relative px-20">
          <Image src={bento} />
        </div>
      </div>
    </div>
  );
};

export default Page;
