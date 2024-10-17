import React from "react";
import CourseCardMd from "../components/self/CourseCardMd";

const CompletedCourses = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-8 mt-8 mb-4">
        <h1 className="text-3xl text-dark-text font-semibold">
          Completed Courses
        </h1>
      </div>
      <div
        className="flex-1 justify-self-center mt-10 self-center shadow-lg w-[90%]"
        style={{ backgroundColor: "#F6F6F6" }}
      >
        <div className="flex flex-wrap justify-center px-8 py-8 gap-6">
          {[...Array(30)].map((_, idx) => (
            <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
              <CourseCardMd
                name="COMP3331"
                difficulty="medium"
                details="This is a course about networks"
                tag="cyber"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedCourses;
