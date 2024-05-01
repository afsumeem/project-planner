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

  // task status
  markTaskAsComplete: (projectId, taskId) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: "Done" };
            }
            return task;
          });
          return { ...project, tasks: updatedTasks };
        }
        return project;
      });
      return { projects: updatedProjects };
    });
  },

  // add a new task
  addTask: (projectId, newTask) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: [
              ...project.tasks,
              { ...newTask, id: project.tasks.length + 1 },
            ],
          };
        }
        return project;
      });
      return { projects: updatedProjects };
    });
  },

  //
  // Edit existing task
  editTask: (projectId, editedTask) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === editedTask.id ? editedTask : task
              ),
            }
          : project
      ),
    })),
}));

//

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
