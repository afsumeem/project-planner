import { useAllProjectsApi } from "@/utils/useProjects";
import { create } from "zustand";

const projectStore = create((set) => ({
  // initial state
  projects: [],
  filter: "All",
  searchTerm: "",
  assigneeFilter: "",
  dueDateFilter: "",

  // set state
  setProject: (projects) => set({ projects: projects }),

  // add new project
  addNewProject: (newProject) =>
    set((state) => ({
      projects: [...state.projects, newProject],
    })),

  // delete project
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter(
        (project) => project.id !== parseInt(projectId)
      ),
    })),

  // set filter
  setFilter: (filter) =>
    set((state) => ({
      filter: filter,
    })),

  // set assignee filter
  setAssigneeFilter: (assignee) =>
    set((state) => ({
      assigneeFilter: assignee,
    })),

  // set search term
  setSearchTerm: (searchTerm) =>
    set((state) => ({
      searchTerm: searchTerm,
    })),

  // set due date filter
  setDueDateFilter: (dueDate) =>
    set((state) => ({
      dueDateFilter: dueDate,
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
