import React from "react";

type ProgressBarProps = {
  progress: number; // percentage of completion
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-full rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-sm font-medium text-dark-text">
        {progress}% completed
      </span>
    </div>
  );
};

export default ProgressBar;
