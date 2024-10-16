import React from "react";
import { Popover } from "../ui/popover";
import { PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "../ui/popover";

import { Dialog } from "../ui/dialog";
import { DialogContent } from "../ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "../ui/dialog";
import { DialogDescription } from "../ui/dialog";
import CourseCardSm from "./CourseCardSm";

type CourseCardProps = {
  name: string;
  difficulty: string;
  details: string;
};

const CourseCardMd = ({ name, difficulty, details }: CourseCardProps) => {
  const getColors = (difficulty: string) => {
    if (difficulty === "easy") {
      return "bg-easy-bg";
    } else if (difficulty === "medium") {
      return "bg-medium-bg";
    } else {
      return "bg-hard-bg";
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="px-12 py-8 border-course-b rounded-xl max-w-44 relative border">
          <p className="font-bold">{name}</p>
          <div
            className={`absolute top-2 left-2 ${getColors(
              difficulty
            )} px-2 rounded-xl`}
          >
            <p className="font-bold" style={{ fontSize: 10 }}>
              {difficulty}
            </p>
          </div>
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
              Similiar Courses:
            </p>
            <p>COMP2521, COMP4128</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCardMd;
