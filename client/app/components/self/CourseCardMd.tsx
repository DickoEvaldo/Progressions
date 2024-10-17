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
  const getColors = (difficulty: string) => {
    if (difficulty === "easy") {
      return "bg-easy-bg";
    } else if (difficulty === "medium") {
      return "bg-medium-bg";
    } else {
      return "bg-hard-bg";
    }
  };

  const getSvg = (tag: string) => {
    if (tag === "cyber") {
      return <CyberSvg />;
    } else if (tag === "backend") {
      return <BackEndSvg />;
    } else if (tag === "frontend") {
      return <FrontEndSvg />;
    } else if (tag === "design") {
      return <DesignSvg />;
    } else if (tag === "ethics") {
      return <EthicsSvg />;
    } else {
      return <SystemSvg />;
    }
  };

  const truncateDetails = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const truncatedDetails = truncateDetails(details, 10);

  return (
    <Dialog>
      <DialogTrigger className="w-full h-full">
        <div className="px-4 flex flex-col py-8 border-course-b rounded-xl relative border h-[100%]">
          <div className="flex justify-between">
            <p className="font-bold">{name}</p>
            <div>
              <Difficulty difficulty={4} />
            </div>
          </div>
          <div className="mt-2 text-left text-sm">{truncatedDetails}</div>
          <div className="mt-14 flex bottom-0">{getSvg(tag)}</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-sm text-gray-text mb-3">Course:</p>
            <h1 className="text-3xl text-dark-text">{name}</h1>
            <div className="flex flex-row items-center">
              <div
                style={{ fontSize: 13 }}
                className={`px-2 rounded-xl mt-2 ${getColors(difficulty)}`}
              >
                {difficulty}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            {details}
            An introduction to problem-solving via programming, which aims to
            have students develop proficiency in using a high level programming
            language. Topics: algorithms, program structures (statements,
            sequence, selection, iteration, functions), data types (numeric,
            character), data structures (arrays, tuples, pointers, lists),
            storage structures (memory, addresses), introduction to analysis of
            algorithms, testing, code quality, teamwork, and reflective
            practice. The course includes extensive practical work in labs and
            programming projects.
            <p className="text-sm text-gray-text mt-4 font-semibold">
              Similar Courses:
            </p>
            <p>COMP2521, COMP4128</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCardMd;
