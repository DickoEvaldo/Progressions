import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";
import Difficulty from "./Difficulty";
import CyberSvg from "../icon/CyberIcon";
import BackEndSvg from "../icon/BackEndIcon";
import DesignSvg from "../icon/DesignIcon";
import FrontEndSvg from "../icon/FrontEndIcon";
import EthicsSvg from "../icon/EthicsIcon";
import SystemSvg from "../icon/SystemIcon";

type CourseCardProps = {
  name: string;
  difficulty: string;
  details: string;
  tag: string;
};

const CourseCardMd = ({ name, difficulty, details, tag }: CourseCardProps) => {
  const getColors = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-easy-bg text-green-700";
      case "medium":
        return "bg-medium-bg text-yellow-700";
      case "hard":
        return "bg-hard-bg text-red-700";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const getSvg = (tag) => {
    switch (tag) {
      case "cyber":
        return <CyberSvg />;
      case "backend":
        return <BackEndSvg />;
      case "frontend":
        return <FrontEndSvg />;
      case "design":
        return <DesignSvg />;
      case "ethics":
        return <EthicsSvg />;
      default:
        return <SystemSvg />;
    }
  };

  const truncateDetails = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full h-full">
        <div className="px-4 py-6 flex flex-col border-course-b rounded-xl shadow-lg hover:shadow-xl transition h-full bg-white">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">{name}</p>
            <Difficulty difficulty={4} />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {truncateDetails(details, 10)}
          </p>
          <div className="mt-10 flex justify-end">{getSvg(tag)}</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-xs text-gray-text">Course:</p>
            <h1 className="text-2xl font-semibold">{name}</h1>
            <span
              className={`px-2 py-1 text-xs rounded-full ${getColors(
                difficulty
              )} mt-1`}
            >
              {difficulty}
            </span>
          </DialogTitle>
          <DialogDescription className="text-gray-700 mt-4">
            {details}
            <p className="text-sm mt-6 text-gray-500">Similar Courses:</p>
            <p>COMP2521, COMP4128</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCardMd;
