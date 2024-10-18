"use client";
import React, { useState, useMemo, useEffect } from "react";
import CourseCardMd from "../components/self/CourseCardMd";
import CourseCardSm from "../components/self/CourseCardSm";
import CoursesPerYear from "../components/self/CoursesPerYear";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../components/self/ProgressBar"; // Import ProgressBar
import axios from "axios";
import { userStore } from "../zustand/userStore";

const Page = () => {
  const { token, name } = userStore();
  const [courseData, setCourseData] = useState();
  console.log(token);

  type Button = {
    id: number;
    name: string;
    highlight: boolean;
  };
  const formatCourseData = (courseData) => {
    const coursesThisYear = {
      termOne: [],
      termTwo: [],
      termThree: [],
    };

    const getDifficulty = (difficultyLevel) => {
      switch (difficultyLevel) {
        case 1:
          return "easy";
        case 2:
          return "medium";
        case 3:
          return "hard";
        default:
          return "medium";
      }
    };

    const getTag = (courseName) => {
      // This is a simplified tag generation.
      // You might want to create a more sophisticated mapping based on course codes or names.
      const prefix = courseName.slice(0, 4).toLowerCase();
      switch (prefix) {
        case "comp":
          return "computer";
        case "math":
          return "math";
        case "cdev":
          return "gened";
        default:
          return "misc";
      }
    };

    courseData.forEach((yearCourses, yearNum) => {
      yearCourses.forEach((courseArray, termIndex) => {
        const termKey = `term${["One", "Two", "Three"][termIndex]}`;

        courseArray.forEach((course) => {
          const formattedCourse = {
            name: course.course_code.toUpperCase(),
            difficulty: getDifficulty(course.difficulty),
            details: course.details,
            tag: getTag(course.name),
            workload: course.difficulty,
            year: yearNum + 1, // Assuming course codes like COMP1511, MATH1131, etc.
          };

          coursesThisYear[termKey].push(formattedCourse);
        });
      });
    });

    return coursesThisYear;
  };

  // Usage in your component
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://10.147.20.154:3000/getRoadMap",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        const formattedData = formatCourseData(response.data);
        setCourseData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);
  // const coursesThisYear = {
  //   termOne: [
  //     {
  //       name: "COMP3121",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "algos",
  //       year: 1,
  //     },
  //     {
  //       name: "COMP6841",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "cyber",
  //       year: 1,
  //     },
  //     {
  //       name: "CDEV3000",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "gened",
  //       year: 1,
  //     },
  //     {
  //       name: "COMP2011",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "datastructures",
  //       year: 2,
  //     },
  //     {
  //       name: "COMP2021",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "theory",
  //       year: 2,
  //     },
  //     {
  //       name: "MATH2501",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "math",
  //       year: 2,
  //     },
  //     {
  //       name: "COMP3011",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "AI",
  //       year: 3,
  //     },
  //     {
  //       name: "COMP3021",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "ML",
  //       year: 3,
  //     },
  //     {
  //       name: "COMP3501",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "networks",
  //       year: 3,
  //     },
  //   ],
  //   termTwo: [
  //     {
  //       name: "COMP3121",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "algos",
  //       year: 1,
  //     },
  //     {
  //       name: "COMP6841",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "cyber",
  //       year: 1,
  //     },
  //     {
  //       name: "CDEV3000",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "gened",
  //       year: 1,
  //     },
  //     {
  //       name: "COMP2012",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "webdev",
  //       year: 2,
  //     },
  //     {
  //       name: "COMP2022",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "OOP",
  //       year: 2,
  //     },
  //     {
  //       name: "MATH2502",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "math",
  //       year: 2,
  //     },
  //     {
  //       name: "COMP3012",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "security",
  //       year: 3,
  //     },
  //     {
  //       name: "COMP3022",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "NLP",
  //       year: 3,
  //     },
  //     {
  //       name: "COMP3502",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "networks",
  //       year: 3,
  //     },
  //   ],
  //   termThree: [
  //     {
  //       name: "COMP3121",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "algos",
  //       year: 1,
  //     },
  //     {
  //       name: "COMP6841",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "cyber",
  //       year: 1,
  //     },
  //     {
  //       name: "CDEV3000",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "gened",
  //       year: 1,
  //     },
  //     {
  //       name: "COMP2013",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "database",
  //       year: 2,
  //     },
  //     {
  //       name: "COMP2023",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "OS",
  //       year: 2,
  //     },
  //     {
  //       name: "MATH2503",
  //       difficulty: "medium",
  //       details: placeholderDetails,
  //       tag: "math",
  //       year: 2,
  //     },
  //     {
  //       name: "COMP3013",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "cloud",
  //       year: 3,
  //     },
  //     {
  //       name: "COMP3023",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "bigdata",
  //       year: 3,
  //     },
  //     {
  //       name: "COMP3503",
  //       difficulty: "hard",
  //       details: placeholderDetails,
  //       tag: "networks",
  //       year: 3,
  //     },
  //   ],
  // };

  const [buttons, setButtons] = useState<Button[]>([
    { id: 0, name: "All", highlight: true },
    { id: 1, name: "Year 1", highlight: false },
    { id: 2, name: "Year 2", highlight: false },
    { id: 3, name: "Year 3", highlight: false },
  ]);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0); // Track progress as a percentage

  const handleButtonClick = (buttonId: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) => ({
        ...button,
        highlight: button.id === buttonId,
      }))
    );
    setSelectedYear(buttonId === 0 ? null : buttonId); // null for "All"
  };

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
  };

  const renderButton = (button: Button) => {
    return (
      <div
        key={button.id}
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
        <div className="flex w-full items-center gap-4">
          <p>Welcome Back, {name}</p>
          <div className="flex items-center justify-end w-full gap-2">
            <div className="w-[85%] justify-self-end self-end">
              <ProgressBar progress={progress} />
            </div>
            {/* <span className="text-sm">{progress}% completed</span> */}
          </div>
        </div>
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
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {courseData && (
              <CoursesPerYear
                coursesThisYear={courseData}
                selectedYear={selectedYear}
                onProgressUpdate={handleProgressUpdate} // Pass callback to update progress
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
