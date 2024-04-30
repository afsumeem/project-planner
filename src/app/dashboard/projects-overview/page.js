"use client";

import useProjects from "@/utils/useProjects";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProjectsOverview = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return response.json();
    },
  });
  console.log(data.length);

  return (
    <div>
      <h2>new</h2>
    </div>
  );
};

export default ProjectsOverview;
