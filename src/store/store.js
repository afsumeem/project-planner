import { useAllProjectsApi } from "@/utils/useProjects";
import { create } from "zustand";

const projectStore = create((set) => ({
  // initial state
  projects: [],

  // set state
  setProject: (projects) => set({ projects }),

  // add new project
  addNewProject: (newProject) =>
    set((state) => ({
      projects: [...state.projects, newProject],
    })),

  // delete project
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
}));

// all project
export const useAllProjects = () => {
  const { projectData, isPending, error } = useAllProjectsApi();
  if (isPending || error) {
    return { projects: [], isPending, error };
  }
  projectStore.setState({ projects: projectData });

  return { projects: projectData, isPending, error };
};

// single project
export const useProjectById = (projectId) => {
  const projects = projectStore((state) => state?.projects);

  const parsedProjectId = parseInt(projectId);
  const project = projects.find((project) => project?.id === parsedProjectId);

  return project;
};

export default projectStore;
