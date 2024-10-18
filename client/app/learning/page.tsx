"use client";
import React, { useState } from "react";
import { FaHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import sql from "../assets/sql.jpg";
import java from "../assets/java.jpeg";
import uiux from "../assets/uiux-course.jpg";
import javascript from "../assets/javascript.jpg";
import react from "../assets/react.jpg";
import node from "../assets/nodejs.png";
import css from "../assets/css.jpg";
import python from "../assets/python.webp";

// Progress bar component
const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="relative mt-2">
      <div className="w-full bg-gray-300 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">{progress}% watched</p>
    </div>
  );
};

const Page = () => {
  // Manage the liked state for each course
  const [likedCourses, setLikedCourses] = useState<Record<string, boolean>>({});

  // Handle Like button toggle
  const toggleLike = (id: string) => {
    setLikedCourses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Sample data for each section
  const inspirationCourses = [
    {
      id: "1",
      title: "Beginner guide to SQL database",
      category: "Front End",
      duration: "2hr 30min",
      image: sql,
      isLiked: false,
    },
    {
      id: "2",
      title: "Java Programming Fundamentals",
      category: "Back End",
      duration: "2hr 30min",
      image: java,
      isLiked: false,
    },
    {
      id: "3",
      title: "UX/UI Design",
      category: "UX Design",
      duration: "2hr 30min",
      image: uiux,
      isLiked: false,
    },
    {
      id: "4",
      title: "Mastering JavaScript",
      category: "Front End",
      duration: "3hr 10min",
      image: javascript,
      isLiked: false,
    },
    {
      id: "5",
      title: "React for Beginners",
      category: "Front End",
      duration: "4hr 20min",
      image: react,
      isLiked: false,
    },
    {
      id: "6",
      title: "Node.js and Express",
      category: "Back End",
      duration: "3hr 45min",
      image: node,
      isLiked: false,
    },
    {
      id: "7",
      title: "Advanced CSS Techniques",
      category: "Front End",
      duration: "2hr 50min",
      image: css,
      isLiked: false,
    },
    {
      id: "8",
      title: "Python for Data Science",
      category: "Data Science",
      duration: "5hr 00min",
      image: python,
      isLiked: false,
    },
  ];

  const continueWatchingCourses = [
    {
      id: "1",
      title: "Beginner guide to SQL database",
      category: "Front End",
      duration: "2hr 30min",
      image: sql,
      isLiked: false,
      progress: 40,
    },
    {
      id: "2",
      title: "Java Programming Fundamentals",
      category: "Back End",
      duration: "2hr 30min",
      image: java,
      isLiked: false,
      progress: 70,
    },
  ];

  const externalMaterialCourses = [
    {
      id: "3",
      title: "UX/UI Design",
      category: "UX Design",
      duration: "2hr 30min",
      image: uiux,
      isLiked: false,
    },
    {
      id: "4",
      title: "Mastering JavaScript",
      category: "Front End",
      duration: "3hr 10min",
      image: javascript,
      isLiked: false,
    },
    {
      id: "6",
      title: "Node.js and Express",
      category: "Back End",
      duration: "3hr 45min",
      image: node,
      isLiked: false,
    },
    {
      id: "7",
      title: "Advanced CSS Techniques",
      category: "Front End",
      duration: "2hr 50min",
      image: css,
      isLiked: false,
    },
  ];

  // State to track the current starting index of displayed courses in each section
  const [inspirationIndex, setInspirationIndex] = useState(0);
  const [continueWatchIndex, setContinueWatchIndex] = useState(0);
  const [externalMaterialIndex, setExternalMaterialIndex] = useState(0);

  // Number of courses to display at a time
  const coursesPerPage = 4;

  // Handle scroll for each section
  const handleScrollRight = (
    sectionIndex: number,
    setSectionIndex: React.Dispatch<React.SetStateAction<number>>,
    courseData: Array<any>
  ) => {
    if (sectionIndex + coursesPerPage < courseData.length) {
      setSectionIndex((prevIndex) => prevIndex + coursesPerPage);
    }
  };

  const handleScrollLeft = (
    sectionIndex: number,
    setSectionIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (sectionIndex - coursesPerPage >= 0) {
      setSectionIndex((prevIndex) => prevIndex - coursesPerPage);
    }
  };

  // Common component for rendering a course card
  const CourseCard = ({ course }: { course: any }) => (
    <div
      key={course.id}
      className="basis-1/4 relative bg-white border-2 border-gray-200 rounded-lg p-4"
    >
      {/* Image */}
      <Image
        src={course.image}
        alt={course.title}
        width={304}
        height={162}
        className="w-full h-40 rounded-md object-cover"
      />
      {/* Course details */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">{course.title}</h3>
        <p className="text-sm text-gray-500">{course.category}</p>
        <p className="text-sm text-gray-500">{course.duration}</p>
      </div>
      {/* Like Button */}
      <button
        onClick={() => toggleLike(course.id)}
        className="absolute top-4 right-4 focus:outline-none mt-2 mr-2"
      >
        <FaHeart
          className={`text-xl ${
            likedCourses[course.id] ? "text-red-500" : "text-gray-300"
          }`}
        />
      </button>
    </div>
  );

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
        <div className="flex flex-col bg-white rounded-lg px-4 py-4 flex-1 shadow-lg">
          {/* Projects Inspiration Section */}
          <div className="mt-1">
            <h2 className="text-2xl font-bold">
              Projects Inspiration + Course Preparation
            </h2>
            <div className="relative mt-4">
              <div className="flex flex-row space-x-6 scrollbar-hide">
                {inspirationCourses
                  .slice(inspirationIndex, inspirationIndex + coursesPerPage)
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
              {/* Navigation Arrows */}
              <div className="flex justify-start mt-4 space-x-6">
                <button
                  onClick={() =>
                    handleScrollLeft(inspirationIndex, setInspirationIndex)
                  }
                  className="focus:outline-none border-2 border-gray-200 bg-white hover:bg-gray-200 p-2 rounded-full"
                >
                  <FaArrowLeft className="text-2xl text-gray-600" />
                </button>
                <button
                  onClick={() =>
                    handleScrollRight(
                      inspirationIndex,
                      setInspirationIndex,
                      inspirationCourses
                    )
                  }
                  className="focus:outline-none border-2 border-gray-200 bg-white hover:bg-gray-200 p-2 rounded-full"
                >
                  <FaArrowRight className="text-2xl text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Continue Watching Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold">Continue Watching</h2>
            <div className="relative mt-4">
              <div className="flex flex-row space-x-6 scrollbar-hide">
                {continueWatchingCourses
                  .slice(
                    continueWatchIndex,
                    continueWatchIndex + coursesPerPage
                  )
                  .map((course) => (
                    <div key={course.id}>
                      <CourseCard key={course.id} course={course} />
                      {/* Progress Bar */}
                      <ProgressBar progress={course.progress} />
                    </div>
                  ))}
              </div>
              {/* Navigation Arrows */}
              <div className="flex justify-start mt-4 space-x-6">
                <button
                  onClick={() =>
                    handleScrollLeft(continueWatchIndex, setContinueWatchIndex)
                  }
                  className="focus:outline-none border-2 border-gray-200 bg-white hover:bg-gray-200 p-2 rounded-full"
                >
                  <FaArrowLeft className="text-2xl text-gray-600" />
                </button>
                <button
                  onClick={() =>
                    handleScrollRight(
                      continueWatchIndex,
                      setContinueWatchIndex,
                      continueWatchingCourses
                    )
                  }
                  className="focus:outline-none border-2 border-gray-200 bg-white hover:bg-gray-200 p-2 rounded-full"
                >
                  <FaArrowRight className="text-2xl text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* External Material Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold">External Material</h2>
            <div className="relative mt-4">
              <div className="flex flex-row space-x-6 scrollbar-hide">
                {externalMaterialCourses
                  .slice(
                    externalMaterialIndex,
                    externalMaterialIndex + coursesPerPage
                  )
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
              {/* Navigation Arrows */}
              <div className="flex justify-start mt-4 space-x-6">
                <button
                  onClick={() =>
                    handleScrollLeft(
                      externalMaterialIndex,
                      setExternalMaterialIndex
                    )
                  }
                  className="focus:outline-none border-2 border-gray-200 bg-white hover:bg-gray-200 p-2 rounded-full"
                >
                  <FaArrowLeft className="text-2xl text-gray-600" />
                </button>
                <button
                  onClick={() =>
                    handleScrollRight(
                      externalMaterialIndex,
                      setExternalMaterialIndex,
                      externalMaterialCourses
                    )
                  }
                  className="focus:outline-none border-2 border-gray-200 bg-white hover:bg-gray-200 p-2 rounded-full"
                >
                  <FaArrowRight className="text-2xl text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
