import { useQuery } from "@tanstack/react-query";

const fetchProjects = async () => {
  const res = await fetch("http://localhost:5000/projects");
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data = await res.json();
  return data;
};

const useProjects = () => {
  return useQuery("projects", fetchProjects);
};

export default useProjects;
