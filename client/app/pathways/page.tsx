"use client";
import React from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "@/node_modules/next/navigation";
import seng from "../assets/seng.jpeg";
import security from "../assets/security.jpeg";
import ai from "../assets/artificial_intel.jpg";
import network from "../assets/networks.webp";
import uiux from "../assets/uiux.jpeg";
import Image, { StaticImageData } from "next/image";

const courseData = [
  { id: "Software Engineer", title: "", image: seng },
  { id: "Cyber Security", title: "", image: security },
  { id: "Artifical Intelligence", title: "", image: ai },
  { id: "Networks Architect", title: "", image: network },
  { id: "UI/UX Designer", title: "", image: uiux },
];

type courseBoxProps = {
  id: string;
  title: string;
  image: StaticImageData;
  isSelected: boolean;
  onClick: () => void;
};

const CourseBox = ({
  id,
  title,
  image,
  isSelected,
  onClick,
}: courseBoxProps) => (
  <div
    onClick={onClick}
    className={`
    relative overflow-hidden rounded-2xl shadow-md h-48 cursor-pointer
    border-4 transform transition duration-300 
    ${isSelected ? "border-[#3fc1fd]" : "border-transparent"}
    hover:shadow-lg hover:border-[#3fc1fd] hover:-translate-y-2
    active:shadow-xl active:-translate-y-4
  `}
  >
    <Image
      width={300}
      height={200}
      src={image}
      alt={title}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="text-white text-center">
        <h3 className="text-xl font-bold">{id}</h3>
        <p>{title}</p>
      </div>
    </div>
  </div>
);

const Page = () => {
  const [selectedCourse, setSelectedCourse] = React.useState<string | null>(
    null
  );
  const router = useRouter();

  const handleCourseClick = (id: string) => {
    setSelectedCourse(id); // Update selected course
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-5xl font-bold mb-12">
        Choose Your <span className="text-[#3fc1fd]">Pathways</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {courseData.slice(0, 3).map((course, index) => (
          <CourseBox
            key={course.id}
            {...course}
            isSelected={selectedCourse === course.id}
            onClick={() => handleCourseClick(course.id)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-12 mt-10">
        {courseData.slice(3, 5).map((course, index) => (
          <div key={index} className="w-full md:w-96">
            <CourseBox
              {...course}
              isSelected={selectedCourse === course.id}
              onClick={() => handleCourseClick(course.id)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 space-x-7">
        <Button
          onClick={() => router.push("/register")}
          className="text-md font-[525] bg-white border-solid border-[1.5px] border-[#3fc1fd] text-[#3fc1fd] px-14 py-5 rounded-[10px]"
        >
          Back
        </Button>
        <Button
          onClick={() => router.push("/interest")}
          className="text-md font-[525] bg-light-button border-[1.5px] border-[#3fc1fd] text-white px-14 py-5 rounded-[10px]"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Page;
