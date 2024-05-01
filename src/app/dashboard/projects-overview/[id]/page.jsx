"use client";

import AddTaskModal from "@/components/AddTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import projectStore, { useProjectById } from "@/store/store";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import ProjectDetailHeader from "@/components/ProjectDetailHeader";
import { FaCircleCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { FaRegCalendarMinus } from "react-icons/fa";

//

//

const ProjectDetailPage = ({ params }) => {
  const project = useProjectById(params.id);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = (values) => {
    const newTaskId = project?.tasks?.length + 101;
    const newTask = {
      id: newTaskId,
      title: values?.title,
      description: values?.description,
      status: "To Do",
      dueDate: values?.dueDate.format("YYYY-MM-DD"),
      assignee: values?.assignee,
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

  //

  const handleEdit = (values) => {
    const editedTask = {
      ...selectedTask,
      title: values?.title,
      description: values?.description,
      status: values?.status,
      // dueDate: values?.dueDate?.format("YYYY-MM-DD"),
      assignee: values?.assignee,
    };
    projectStore.getState().editTask(project.id, editedTask);
    setEditVisible(false);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditVisible(true);
  };

  return (
    <>
      <div>
        {/* project detail header */}
        <ProjectDetailHeader
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          statusFilter={statusFilter}
          handleFilter={handleFilter}
          assigneeFilter={assigneeFilter}
          project={project}
          dueDateFilter={dueDateFilter}
          showModal={showModal}
          handleDueDateFilter={handleDueDateFilter}
          handleAssigneeFilter={handleAssigneeFilter}
        />
        <hr />

        {/* display single project */}
        <div className="mt-10">
          <p className="text-[#071952] text-3xl font-bold m-0 p-0">
            {project?.name}
          </p>
          <p className="m-0 p-0 text-xl font-semibold">
            {project?.description}
          </p>
          <hr />
        </div>
        {/*  */}

        <div className="grid grid-cols-4 mt-10">
          <div className="grid grid-cols-1">
            <div className="bg-[#071952] py-2 rounded">
              <p className="text-white text-center text-xl m-0 p-0">
                All Tasks
              </p>
            </div>

            <div>
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
                  <div key={task.id} className="p-5 shadow-md my-2 bg-sky-100">
                    <div className="flex justify-between items-center">
                      <p className="m-0 p-0 bg-sky-200 px-4 py-2 rounded-lg font-semibold text-sm">
                        {task.title}
                      </p>
                      <Tooltip placement="topLeft" title="Mark as Complete">
                        <button
                          onClick={() => markAsComplete(project.id, task.id)}
                          className="border-0 bg-inherit text-lg cursor-pointer"
                        >
                          <FaCircleCheck />
                        </button>
                      </Tooltip>
                    </div>

                    <p>{task.description}</p>
                    <p>{task.status}</p>

                    {task?.assignee ? (
                      <>
                        <p>Assignee: {task.assignee}</p>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEditClick(task)}>
                          Assign Member
                        </Button>
                      </>
                    )}
                    <div className="flex justify-between items-center gap-1">
                      <p className="flex gap-1 items-center font-semibold">
                        <FaRegCalendarMinus />
                        {task.dueDate}
                      </p>
                      <Button
                        onClick={() => handleEditClick(task)}
                        className="flex justify-end items-center gap-1 bg-[#071952] text-white"
                      >
                        <CiEdit /> Edit
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div></div>
          <div></div>
        </div>

        <div className="grid grid-cols-1">
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

      <EditTaskModal
        visible={editVisible}
        onCreate={handleEdit}
        onCancel={handleCancel}
        task={selectedTask}
        teamMembers={project?.teamMembers}
      />
    </>
  );
};

export default ProjectDetailPage;
