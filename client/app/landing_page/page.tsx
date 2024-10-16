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
import ButtonBackend from "../assets/ButtonBackend.png";
import ButtonFrontEnd from "../assets/ButtonFrontEnd.png";
import ButtonNetworks from "../assets/ButtonNetworks.png";
import ButtonCyber from "../assets/ButtonCyber.png";
import ButtonSystem from "../assets/ButtonSystem.png";
import UiUxButton from "../assets/UiUxButton.png";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col gap-4 px-8  justify-center h-full">
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
          <div className="absolute top-1/8 left-1/6">
            <Image src={ButtonFrontEnd} />
          </div>
          <div className="absolute top-0 right-1/3">
            <Image src={ButtonBackend} />
          </div>
          <div className="absolute bottom-0 left-1/4">
            <Image src={ButtonNetworks} />
          </div>
          <div className="absolute bottom-0 right-0">
            <Image src={ButtonCyber} />
          </div>
          <div className="absolute top-1/2 right-1/4">
            <Image src={ButtonSystem} />
          </div>
          <div className="absolute bottom-1/2 left-1/8">
            <Image src={UiUxButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
