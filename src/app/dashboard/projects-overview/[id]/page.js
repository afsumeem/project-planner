"use client";
import { useProjectById } from "@/utils/useProjects";

const ProjectDetailPage = ({ params }) => {
  const projectData = useProjectById(params.id);

  return (
    <div>
      <h2>Project Detail: {projectData?.name}</h2>
      <p>{projectData?.description}</p>
      <p> tasks:</p>
      <div className="grid grid-cols-3">
        {projectData?.tasks?.map((task) => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.dueDate}</p>
            <p>{task.assignee}</p>
          </div>
        ))}
      </div>

      <p> teamMembers:</p>
      <div className="grid grid-cols-3">
        {projectData?.teamMembers?.map((team) => (
          <div key={team.id}>
            <h2>{team.name}</h2>
            <p>{team.role}</p>
          </div>
        ))}
      </div>

      <p> recentActivities:</p>
      <div className="grid grid-cols-3">
        {projectData?.recentActivities?.map((activity) => (
          <div key={activity.id}>
            <h2>{activity.description}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
