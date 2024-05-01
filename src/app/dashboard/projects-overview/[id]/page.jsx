"use client";

import { useProjectById } from "@/store/store";

//

const ProjectDetailPage = ({ params }) => {
  const project = useProjectById(params.id);

  //
  // const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState("All");

  // useEffect(() => {
  //   useProjectStore.setState({ project: projectData });
  // }, [projectData]);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  //   useProjectStore?.searchTasksByTitle(e.target.value);
  // };
  // const handleFilter = (status) => {
  //   setStatusFilter(status);
  //   if (status === "All") {
  //     useProjectStore.setState({ project: projectData });
  //   } else {
  //     useProjectStore?.filterTasksByStatus(status);
  //   }
  // };
  //
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchTerm}
        onChange={handleSearch}
      /> */}
      {/* 
      <select
        value={statusFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select> */}

      {/*  */}
      <h2>Project Detail: {project?.name}</h2>
      <p>{project?.description}</p>
      <p> tasks:</p>

      {/* <div className="grid grid-cols-3">
        {projectData?.tasks
          .filter(
            (task) => task.status === statusFilter || statusFilter === "All"
          )
          .filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((task) => (
            <div key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{task.status}</p>
              <p>{task.dueDate}</p>
              <p>{task.assignee}</p>
            </div>
          ))}
      </div> */}

      {/* <p> teamMembers:</p>
      <div className="grid grid-cols-3">
        {projectData?.teamMembers?.map((team) => (
          <div key={team.id}>
            <h2>{team.name}</h2>
            <p>{team.role}</p>
          </div>
        ))}
      </div> */}

      {/* <p> recentActivities:</p>
      <div className="grid grid-cols-3">
        {projectData?.recentActivities?.map((activity) => (
          <div key={activity.id}>
            <h2>{activity.description}</h2>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ProjectDetailPage;
