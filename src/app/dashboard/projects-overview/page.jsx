"use client";

import EditProjectModal from "@/components/EditProjectModal";
import projectStore from "@/store/store";
import { useAllProjects } from "@/store/store";
import Link from "next/link";

const ProjectsOverview = () => {
  const { projects } = useAllProjects();

  // delete project
  // const handleDelete = (projectId) => {
  //   console.log(projectId);
  //   projectStore.deleteProject(projectId);
  // };

  return (
    <div>
      {projects &&
        projects.map((data) => (
          <div key={data.id}>
            <h2>{data.name}</h2>
            <Link href={`/dashboard/projects-overview/${data.id}`}>View</Link>
            <EditProjectModal />
            <button onClick={() => handleDelete(data.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default ProjectsOverview;
