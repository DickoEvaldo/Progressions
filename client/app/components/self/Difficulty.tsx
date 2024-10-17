import React from "react";

const Difficulty = ({ difficulty }: { difficulty: number }) => {
  const maxDifficulty = 5;

  const getColor = (level: number) => {
    if (level === 1) return "bg-green-500";
    if (level === 2 || level === 3) return "bg-yellow-500";
    if (level === 4 || level === 5) return "bg-red-500";
    return "bg-gray-300";
  };

  return (
    <div className="flex flex-row gap-2">
      {[...Array(maxDifficulty)].map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full ${
            index < difficulty ? getColor(difficulty) : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default Difficulty;
