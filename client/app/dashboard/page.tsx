"use client";
import React, { useState } from "react";
import CourseCardMd from "../components/self/CourseCardMd";
import CourseCardSm from "../components/self/CourseCardSm";

const Page = () => {
  type Button = {
    id: number;
    name: string;
    highlight: boolean;
  };

  const [buttons, setButtons] = useState<Button[]>([
    {
      id: 0,
      name: "All",
      highlight: true,
    },
    {
      id: 1,
      name: "Year 1",
      highlight: false,
    },
    {
      id: 2,
      name: "Year 2",
      highlight: false,
    },
    {
      id: 3,
      name: "Year 3",
      highlight: false,
    },
  ]);

  const handleButtonClick = (buttonId: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) => ({
        ...button,
        highlight: button.id === buttonId,
      }))
    );
  };

  const renderButton = (button: Button) => {
    return (
      <div
        className={`px-4 py-1 rounded-2xl ${
          button.highlight
            ? "bg-light-button text-white"
            : "bg-white text-dark-button"
        } cursor-pointer border`}
        onClick={() => handleButtonClick(button.id)}
      >
        {button.name}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col gap-4 mt-8 px-8">
        <p>Welcome Back, Dicko!</p>
        <h1 className="text-3xl text-dark-text">3778 - Computer Science</h1>
      </div>
      <div
        className="flex flex-row min-h-screen px-8 py-8 mt-12 gap-8"
        style={{ backgroundColor: "#F6F6F6" }}
      >
        <div className="flex flex-row w-max shadow-lg">
          <div className="flex flex-col bg-white rounded-lg px-4 py-4 min-w-60">
            <p className="text-sm text-gray-text font-semibold">Courses</p>
            <p className="mt-4 font-bold">Current Courses</p>
            <div className="flex flex-col gap-2 mt-2">
              <CourseCardSm name="COMP3121" tag="NETWORK" />
            </div>
            <p className="mt-8 font-bold">Upcoming Courses</p>
            <div className="flex flex-col gap-2 mt-2">
              <CourseCardSm name="COMP3121" tag="NETWORK" />
            </div>
            <p className="mt-8 font-bold">Finished Courses</p>
            <div className="flex flex-col gap-2 mt-2">
              <CourseCardSm name="COMP3121" tag="NETWORK" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex flex-col bg-white rounded-lg px-4 py-4 flex-1 shadow-lg">
            <div className="flex flex-row gap-4 justify-center text-md">
              {buttons.map((button) => renderButton(button))}
            </div>
            {/* Scrollable div with fixed max height */}
            <div className="overflow-y-auto max-h-96 mt-4">
              <div className="flex flex-row gap-10 justify-around">
                <div className="flex flex-col gap-4">
                  <h1 className="text-center">Term 1</h1>
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-center">Term 2</h1>
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-center">Term 3</h1>
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                  <CourseCardMd name="COMP3121" difficulty="hard" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-lg px-4 py-4 h-1/3 shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
