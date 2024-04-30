"use client";

import { useProjects } from "@/utils/useProjects";
import Link from "next/link";

const ProjectsOverview = () => {
  const [projectData] = useProjects();
  // console.log(projectData);
  return (
    <div>
      {projectData &&
        projectData.map((data) => (
          <div key={data.id}>
            <h2>{data.name}</h2>
            <Link href={`/dashboard/projects-overview/${data.id}`}>View</Link>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default ProjectsOverview;
