import React from "react";

type CourseCardProps = {
  name: string;
  tag: string;
};

const CourseCardSm = ({ name, tag }: CourseCardProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="text-sm text-gray-text">{name}</p>
      <div className="rounded-xl bg-easy-bg px-2 w-18 text-center">
        <p style={{ fontSize: 11 }}>{tag.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default CourseCardSm;
