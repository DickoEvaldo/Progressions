import React from "react";
import SearchIcon from "../components/icon/SearchIcon";
import StarIcon from "../components/icon/StarIcon";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const RoadmapItem = ({ title, description }) => {
  const filledStars = Math.floor(Math.random() * 6); // Random number from 0 to 5
  return (
    <div className="flex flex-col rounded-lg bg-white py-4 px-4 w-full gap-2 cursor-pointer">
      <h1 className="text-sm font-bold">{title}</h1>
      <p className="text-sm text-gray-text">{description}</p>
      <div className="flex flex-row gap-0.5 mt-auto">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`size-6 ${
              i < filledStars ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const CommunityRoadmaps = () => {
  const roadmaps = [
    {
      title: "LLM Engineer",
      description:
        "The LLM Engineer roadmap which is a mixture of Software Engineer and AI Engineer",
    },
    {
      title: "Frontend Developer",
      description: "A comprehensive roadmap for becoming a frontend developer",
    },
    {
      title: "Backend Developer",
      description: "Essential skills and technologies for backend development",
    },
    {
      title: "DevOps Engineer",
      description: "The path to becoming a proficient DevOps engineer",
    },
    {
      title: "Data Scientist",
      description: "Key skills and tools for aspiring data scientists",
    },
    {
      title: "Cybersecurity Specialist",
      description: "Critical path for becoming a cybersecurity expert",
    },
    {
      title: "Cloud Architect",
      description: "Essential knowledge for cloud architecture and deployment",
    },
    {
      title: "UI/UX Designer",
      description: "The journey to becoming a skilled UI/UX designer",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="py-12 px-36 flex flex-col gap-4 border-b-2">
        <h1 className="text-4xl font-bold">Community Roadmaps</h1>
        <p className="text-gray-text">
          A selected list of community-created Roadmaps
        </p>
        <div className="flex flex-row gap-2 items-center">
          <Button>Create your own roadmap</Button>
          <Button className="bg-light-button">back to dashboard</Button>
        </div>
      </div>
      <div className="flex flex-col min-h-screen bg-gray-200 px-36">
        <div className="flex flex-row items-center bg-white rounded-lg px-4 mt-4 w-1/3">
          <SearchIcon />
          <Input placeholder="Search roadmap.." className="bg-white border-0" />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {roadmaps.map((roadmap, index) => (
            <RoadmapItem
              key={index}
              title={roadmap.title}
              description={roadmap.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityRoadmaps;
