"use client";
import React from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "@/node_modules/next/navigation";
import math from "../assets/math.jpeg";
import finance from "../assets/finance.jpg";
import psychology from "../assets/psychology.jpg";
import infosys from "../assets/infosys.jpg";
import marketing from "../assets/marketing.jpg";
import Image, { StaticImageData } from "next/image";
import axios from "axios";
import { userStore } from "../zustand/userStore";

const courseData = [
  { id: "Mathematics", code: "", image: math },
  { id: "Finance", code: "", image: finance },
  { id: "Psychology", code: "", image: psychology },
  { id: "Information System", code: "", image: infosys },
  { id: "Marketing", code: "", image: marketing },
];

type courseBoxProps = {
  id: string;
  code: string;
  image: StaticImageData;
  isSelected: boolean;
  onClick: () => void;
};

const CourseBox = ({
  id,
  code,
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
      alt={code}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="text-white text-center">
        <h3 className="text-xl font-bold">{id}</h3>
        <p>{code}</p>
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

  const { name, email, password, program, interest, setToken } = userStore();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://10.147.20.154:3000/register", {
        name: name,
        email: email,
        password: password,
        program: program,
        interest: interest,
      });
      console.log(response.data.token);
      setToken(response.data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-5xl font-bold mb-12">
        Choose Your <span className="text-[#3fc1fd]">Minor</span>
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
          onClick={() => router.push("/pathways")}
          className="text-md font-[525] bg-white border-solid border-[1.5px] border-[#3fc1fd] text-[#3fc1fd] px-14 py-5 rounded-[10px] hover:text-white"
        >
          Back
        </Button>
        <Button
          onClick={() => router.push("/dashboard")}
          className="text-md font-[525] bg-light-button border-[1.5px] border-[#3fc1fd] text-white px-8 py-5 rounded-[10px] hover:text-[#3fc1fd]"
        >
          Start Course
        </Button>
        <Button
          onClick={handleSubmit}
          className="text-md font-[525] bg-gray-300 border-[1.5px] border-gray-300 text-gray-700 px-8 py-5 rounded-[10px] hover:text-white"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};

export default Page;
