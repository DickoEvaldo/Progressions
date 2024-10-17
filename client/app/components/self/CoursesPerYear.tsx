import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import CourseCardMd from "./CourseCardMd";
type Course = {
  name: string;
  difficulty: string;
  details: string;
  tag: string;
  year: number;
  term: string;
};

type CoursesPerYearProps = {
  coursesThisYear: {
    termOne: Course[];
    termTwo: Course[];
    termThree: Course[];
  };
  selectedYear?: number | null;
};

const CoursesPerYear = ({
  coursesThisYear,
  selectedYear,
}: CoursesPerYearProps) => {
  const allCourses = React.useMemo(() => {
    return ["termOne", "termTwo", "termThree"].flatMap((term) =>
      coursesThisYear[term].map((course) => ({ ...course, term }))
    );
  }, [coursesThisYear]);

  const coursesByYear = React.useMemo(() => {
    return allCourses.reduce((acc, course) => {
      acc[course.year] = acc[course.year] || [];
      acc[course.year].push(course);
      return acc;
    }, {} as Record<number, Course[]>);
  }, [allCourses]);

  const renderCourses = (courses: Course[]) => {
    return courses.map((course, index) => (
      <CourseCardMd
        key={`${course}-${index}`}
        name={course.name}
        difficulty={course.difficulty}
        details={course.details}
        tag={course.tag}
      />
    ));
  };

  const renderYearSection = (year: number) => {
    const yearCourses = coursesByYear[year] || [];
    return (
      <div className="flex flex-col gap-4 h-full w-full">
        <h2 className="text-2xl font-bold mb-4">Year {year}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["termOne", "termTwo", "termThree"].map((term) => (
            <div key={term} className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">
                {term.replace("term", "Term ")}
              </h3>
              {renderCourses(
                yearCourses.filter((course) => course.term === term)
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="overflow-y-auto mt-4 px-4 md:px-8 lg:px-16"
      style={{ height: "90vh" }}
    >
      {selectedYear
        ? renderYearSection(selectedYear)
        : [1, 2, 3].map((year) => renderYearSection(year))}
    </div>
  );
};

export default CoursesPerYear;

// 6080 3311 3142 3331 3511 6771 2041 3231 6841 6843 DESN1000
// 1521 1511 1531 2521 2511 3121 3900 4920 MATH1131 1231 1081
// CDEV3000 ARTS1630
