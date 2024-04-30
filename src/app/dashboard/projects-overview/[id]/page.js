"use client";
import { useProjectById } from "@/utils/useProjects";

const ProjectDetailPage = ({ params }) => {
  const projectData = useProjectById(params.id);

  return (
    <div>
      <h2>Project Detail: {projectData.name}</h2>
    </div>
  );
};

export default ProjectDetailPage;
