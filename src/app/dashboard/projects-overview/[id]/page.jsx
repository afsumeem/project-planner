"use client";

import projectStore, { useProjectById } from "@/store/store";
import { useState } from "react";

//

const ProjectDetailPage = ({ params }) => {
  const project = useProjectById(params.id);
  const [statusFilter, setStatusFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //  status filter
  const handleFilter = (value) => {
    setStatusFilter(value);
    projectStore.getState().setFilter(value);
  };

  // assignee filter

  const handleAssigneeFilter = (value) => {
    setAssigneeFilter(value);
    projectStore.getState().setAssigneeFilter(value);
  };

  // search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    projectStore.getState().setSearchTerm(e.target.value);
  };

  // Access filter and searchTerm
  const filter = projectStore((state) => state.filter);
  const searchTermFromStore = projectStore((state) => state.searchTerm);
  const assigneeFilterFromStore = projectStore((state) => state.assigneeFilter);

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <select
        value={statusFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="To Do">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={assigneeFilter}
        onChange={(e) => handleAssigneeFilter(e.target.value)}
      >
        <option value="">All Assignees</option>
        {project?.teamMembers?.map((team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>

      <h2>Project Detail: {project?.name}</h2>
      <p>{project?.description}</p>
      <p> tasks:</p>

      <div className="grid grid-cols-3">
        {project?.tasks
          .filter((task) => task.status === filter || filter === "All")
          .filter(
            (task) =>
              task.assignee === assigneeFilterFromStore ||
              assigneeFilterFromStore === ""
          )
          .filter((task) =>
            task.title.toLowerCase().includes(searchTermFromStore.toLowerCase())
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
      </div>

      <p> teamMembers:</p>
      <div className="grid grid-cols-3">
        {project?.teamMembers?.map((team) => (
          <div key={team.id}>
            <h2>{team.name}</h2>
            <p>{team.role}</p>
          </div>
        ))}
      </div>

      <p> recentActivities:</p>
      <div className="grid grid-cols-3">
        {project?.recentActivities?.map((activity) => (
          <div key={activity.id}>
            <h2>{activity.description}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
