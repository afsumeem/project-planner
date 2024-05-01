"use client";

import AddTaskModal from "@/components/AddTaskModal";
import projectStore, { useProjectById } from "@/store/store";
import { Button } from "antd";
import { useState } from "react";

//

const ProjectDetailPage = ({ params }) => {
  const project = useProjectById(params.id);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = (values) => {
    const newTaskId = project.tasks.length + 101;
    const newTask = {
      id: newTaskId,
      title: values.title,
      description: values.description,
      status: "To Do",
      dueDate: values.dueDate.format("YYYY-MM-DD"),
      assignee: values.assignee,
    };
    projectStore.getState().addTask(project.id, newTask);
    setVisible(false);
  };
  //

  const [statusFilter, setStatusFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");

  //

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

  // due date
  const handleDueDateFilter = (value) => {
    setDueDateFilter(value);
    projectStore.getState().setDueDateFilter(value);
  };

  // Access filter and searchTerm from store
  const filter = projectStore((state) => state.filter);
  const searchTermFromStore = projectStore((state) => state.searchTerm);
  const assigneeFilterFromStore = projectStore((state) => state.assigneeFilter);
  const dueDateFilterFromStore = projectStore((state) => state.dueDateFilter);

  //
  const markAsComplete = (projectId, taskId) => {
    projectStore.getState().markTaskAsComplete(projectId, taskId);
  };

  return (
    <>
      <div>
        <Button type="primary" onClick={showModal}>
          Add new task
        </Button>

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

        {/*  */}

        <input
          type="date"
          value={dueDateFilter}
          onChange={(e) => handleDueDateFilter(e.target.value)}
        />
        {/*  */}
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
            .filter(
              (task) =>
                task.dueDate === dueDateFilterFromStore ||
                dueDateFilterFromStore === ""
            )
            .filter((task) =>
              task.title
                .toLowerCase()
                .includes(searchTermFromStore.toLowerCase())
            )
            .map((task) => (
              <div key={task.id}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>{task.status}</p>
                <p>{task.dueDate}</p>
                <p>{task.assignee}</p>
                <button>Edit task</button>
                <button onClick={() => markAsComplete(project.id, task.id)}>
                  Mark as complete
                </button>
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
      <AddTaskModal
        visible={visible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        teamMembers={project?.teamMembers}
      />
    </>
  );
};

export default ProjectDetailPage;
