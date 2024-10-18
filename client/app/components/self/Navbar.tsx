"use client";
import Link from "next/link";
import React from "react";
import Logo from "../icon/Logo";
import { buttonVariants, Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
<<<<<<< HEAD
    <div className="top-0 py-4">
      <div className="flex flex-row items-center justify-center px-8">
        <Link href={"/"} className="cursor-pointer mr-auto">
          <Logo />
        </Link>
        <div className="flex gap-8 text-sm cursor-pointer">
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/roadmap"}>Community Roadmaps</Link>
          <Link href={"/learning"}>Recommended Learning</Link>
=======
    <div className="top-0 py-4 w-full bg-white ">
      <div className=" mx-auto flex justify-between items-center px-6 md:px-12">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer">
            <Logo />
          </Link>
>>>>>>> d37a0a0f504364e70be6abe22bdaec78ab0c25ca
        </div>

        {/* Center Section: Links */}
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/roadmap" className="hover:underline">
            Roadmap
          </Link>
        </div>

        {/* Right Section: Buttons */}
        <div className="flex gap-4 items-center">
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
          <Button
            onClick={() => router.push("/register")}
            className="bg-light-button"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
