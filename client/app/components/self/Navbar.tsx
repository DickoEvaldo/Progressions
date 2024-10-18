"use client";
import Link from "next/link";
import React from "react";
import Logo from "../icon/Logo";
import { buttonVariants, Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { userStore } from "@/app/zustand/userStore";

const Navbar = () => {
  const { token } = userStore();
  const router = useRouter();

  return (
    <div className="top-0 py-4 w-full bg-white ">
      <div className=" mx-auto flex justify-between items-center px-6 md:px-12">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer">
            <Logo />
          </Link>
        </div>

        {/* Center Section: Links */}
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/roadmap" className="hover:underline">
            Community Roadmaps
          </Link>
          <Link href="/learning" className="hover:underline">
            Recommended Learnings
          </Link>
        </div>

        {/* Right Section: Buttons */}
        <div className="flex gap-4 items-center">
          {!token && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
