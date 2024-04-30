"use client";

import { useQuery } from "@tanstack/react-query";

const fetchProjects = async () => {
  const response = await fetch("http://localhost:5000/projects");
  return response.json();
};

const fetchProjectById = async (projectId) => {
  const response = await fetch(`http://localhost:5000/projects/${projectId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch project detail");
  }
  return response.json();
};

//  fetch all projects
export const useProjects = () => {
  const {
    isPending,
    error,
    data: projectData = [],
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: true,
  });

  return [projectData];
};

// fetch single project
export const useProjectById = (projectId) => {
  const {
    data: projectData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectById(projectId),
    enabled: !!projectId,
  });

  return projectData;
};
