import React from "react";
import Logo from "../icon/Logo";
import Link from "@/node_modules/next/link";
import {
  TwitterLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
const Footer = () => {
  return (
    <div className="bottom-0 w-full py-6 px-2">
      <div className="flex w-full gap-8 flex-col items-center justify-center">
        <Link href={"/"} className="cursor-pointer self-center">
          <Logo />
        </Link>
        <h3 className="text-medium text-center">
          Elevate your data cleansing game with our no-code platform, designed
          to effortlessly refine and optimize your datasets for superior
          quality.
        </h3>
        <h3 className="text-medium text-center">
          For enquiries, please progressions@gmail.com
        </h3>
        <div className="flex justify-center items-center w-full flex-row gap-4 w-[10%]">
          <Link
            href={
              "https://www.linkedin.com/company/devsoc-unsw/posts/?feedView=all"
            }
          >
            <InstagramLogoIcon className="w-8 h-8 cursor-pointer" />
          </Link>
          <Link
            href={
              "https://www.linkedin.com/company/devsoc-unsw/posts/?feedView=all"
            }
          >
            <TwitterLogoIcon className="w-8 h-8 cursor-pointer" />
          </Link>
          <Link
            href={
              "https://www.linkedin.com/company/devsoc-unsw/posts/?feedView=all"
            }
          >
            <LinkedInLogoIcon className="w-8 h-8 cursor-pointer" />
          </Link>
        </div>
        <div className="w-[97%] border-black border " />
        <div className="w-[97%] flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <h3>Service Agreement</h3>
            <h3>Terms of Use</h3>
            <h3>Privacy policy</h3>
          </div>
          <h3>© 2024 Progressions Pty Ltd. All Rights Reserved.</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
