"use client";
import Link from "@/node_modules/next/link";
import React from "react";
import Logo from "../icon/Logo";
import { buttonVariants, Button } from "../ui/button";
import { useRouter } from "@/node_modules/next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="top-0 py-4">
      <div className="flex flex-row items-center justify-center px-8">
        <Link href={"/"} className="cursor-pointer mr-auto">
          <Logo />
        </Link>
        <div className="flex gap-8 text-sm cursor-pointer">
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/roadmap"}>Roadmap</Link>
        </div>
        <div className="flex gap-4 ml-auto">
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
          <Button
            onClick={() => router.push("/register")}
            className={" bg-light-button"}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
