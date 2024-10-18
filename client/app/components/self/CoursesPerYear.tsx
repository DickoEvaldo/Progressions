import React, { useState, useEffect } from "react";
import CourseCardMd from "./CourseCardMd";
import { Button } from "../ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Course = {
  name: string;
  difficulty: string;
  details: string;
  tag: string;
  year: number;
  term: string;
  workload: number;
};

type CoursesPerYearProps = {
  coursesThisYear: {
    termOne: Course[];
    termTwo: Course[];
    termThree: Course[];
  };
  selectedYear?: number | null;
  onProgressUpdate: (progress: number) => void; // Add progress update callback
};

const CoursesPerYear = ({
  coursesThisYear,
  selectedYear,
  onProgressUpdate,
}: CoursesPerYearProps) => {
  const [completedTerms, setCompletedTerms] = useState<
    Record<number, Record<string, boolean>>
  >({});

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

  const toggleTermCompletion = (year: number, term: string) => {
    setCompletedTerms((prev) => {
      const termCompleted = !prev[year]?.[term];

      // Show the toast when the term is marked complete
      if (termCompleted) {
        toast.success(
          `Congratulations! You've completed ${term.replace(
            "term",
            "Term "
          )} of Year ${year}. 🎉`
        );
      }

      return {
        ...prev,
        [year]: {
          ...prev[year],
          [term]: termCompleted,
        },
      };
    });
  };

  const isTermCompleted = (year: number, term: string) => {
    return completedTerms[year]?.[term] || false;
  };

  // Calculate overall progress when the completed terms change
  useEffect(() => {
    const totalTerms = 3 * Object.keys(coursesByYear).length;
    const completedTermsCount = Object.values(completedTerms).reduce(
      (sum, terms) => sum + Object.values(terms).filter(Boolean).length,
      0
    );
    const progress = Math.round((completedTermsCount / totalTerms) * 100);
    onProgressUpdate(progress); // Update progress in parent
  }, [completedTerms, coursesByYear, onProgressUpdate]);

  const renderCourses = (courses: Course[], disabled: boolean) => {
    console.log("Rendering courses:", courses); // Debugging log to check the courses
    return courses.map((course, index) => (
      <div
        key={`${course}-${index}`}
        className={disabled ? "opacity-50 pointer-events-none" : ""}
      >
        <CourseCardMd
          name={course.name}
          difficulty={course.difficulty}
          details={course.details}
          tag={course.tag}
          workload={course.workload}
        />
      </div>
    ));
  };

  const renderYearSection = (year: number) => {
    const yearCourses = coursesByYear[year] || [];
    return (
      <div className="flex flex-col gap-4 h-full w-full">
        <h2 className="text-2xl font-bold mb-4">Year {year}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["termOne", "termTwo", "termThree"].map((term) => {
            const termCompleted = isTermCompleted(year, term);
            const filteredCourses = yearCourses.filter(
              (course) => course.term === term
            );

            console.log(
              `Term: ${term}, Year: ${year}, Filtered Courses:`,
              filteredCourses
            ); // Debugging log

            return (
              <div key={term} className="flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <h3 className="text-xl font-semibold">
                    {term.replace("term", "Term ")}
                  </h3>
                  <Button
                    className={`rounded-full w-12 h-8 ${
                      termCompleted ? "bg-green-500" : ""
                    }`}
                    onClick={() => toggleTermCompletion(year, term)}
                  >
                    <CheckIcon className="w-6 h-6" />
                  </Button>
                </div>
                {filteredCourses.length > 0
                  ? renderCourses(filteredCourses, termCompleted)
                  : "No courses available for this term."}
              </div>
            );
          })}
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
