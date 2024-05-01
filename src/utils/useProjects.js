import { useQuery } from "@tanstack/react-query";

//  fetch all projects

export const fetchProjects = async () => {
  const response = await fetch("/projects.json");
  const allProjectsData = response.json();
  return allProjectsData;
};

export const useAllProjectsApi = () => {
  const {
    isPending,
    error,
    data: projectData,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: true,
  });

  return { projectData, isPending, error };
};

//fetch single project

// export const fetchProjectById = async (projectId) => {
//   const allProjectsData = await fetchProjects();
//   const projectData = allProjectsData.find(
//     (project) => project?.id === parseInt(projectId)
//   );
//   return projectData;
// };

// fetch single project
// export const useProjectByIdApi = (projectId) => {
//   const {
//     data: singleData,
//     error,
//     isPending,
//   } = useQuery({
//     queryKey: ["project", projectId],
//     queryFn: () => fetchProjectById(projectId),
//     enabled: !!projectId,
//   });
//   console.log(singleData);
//   return { singleData, isPending, error };
// };
