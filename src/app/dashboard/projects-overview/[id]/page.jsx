/* eslint-disable @next/next/no-img-element */
"use client";

import AddTaskModal from "@/components/AddTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import projectStore, { useProjectById } from "@/store/store";
import { useState } from "react";
import ProjectDetailHeader from "@/components/ProjectDetailHeader";
import RecentActivity from "@/components/RecentActivity";
import TeamMember from "@/components/TeamMember";
import TaskDetail from "@/components/TaskDetail";
import { Button } from "antd";
import Link from "next/link";
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

  // drag and drop functionality
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    const droppedTask = JSON.parse(e.dataTransfer.getData("task"));

    projectStore
      .getState()
      .editTask(project.id, { ...droppedTask, status: status });
  };

  return (
    <>
      {project ? (
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
              <p className="text-[#071952] text-2xl font-bold m-0 p-0">
                {project?.name}
              </p>
              <p className="m-0 p-0 text-sm font-semibold">
                {project?.description}
              </p>
            </div>
            {/*  */}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 mt-10">
              <div className="col-span-1">
                <div className="bg-[#c7c5c5] py-2 rounded">
                  <p className="font-bold text-center text-xl m-0 p-0">
                    All Task
                  </p>
                </div>

                <div
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, "")}
                >
                  {project && project.tasks.length === 0 ? (
                    <div className="text-gray-500 text-center">
                      No tasks found.
                    </div>
                  ) : (
                    project?.tasks
                      .filter(
                        (task) => task.status === filter || filter === "All"
                      )
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
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                          className={`p-4 shadow-md my-2 ${
                            task.status === "To Do"
                              ? "bg-[#FFE4C9]"
                              : task.status === "In Progress"
                              ? "bg-[#FFFBDA]"
                              : task.status === "Done"
                              ? "bg-[#E2F4C5]"
                              : "bg-inherit"
                          }`}
                        >
                          <TaskDetail
                            task={task}
                            handleEditClick={handleEditClick}
                            markAsComplete={markAsComplete}
                            project={project}
                          />
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* to do list */}

              <div className="col-span-1" style={{ minHeight: "100px" }}>
                <div className="bg-[#ffb6ac] py-2 rounded">
                  <p className="font-bold text-center text-xl m-0 p-0">To Do</p>
                </div>

                <div
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, "To Do")}
                >
                  {project?.tasks
                    .filter((task) => task.status === "To Do")
                    .map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        className="p-4 min-h-40 shadow-md my-2 bg-[#FFFBDA]"
                      >
                        <TaskDetail
                          task={task}
                          handleEditClick={handleEditClick}
                          markAsComplete={markAsComplete}
                          project={project}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* in progress list */}
              <div className="col-span-1">
                <div className="bg-[#f7f89a] py-2 rounded">
                  <p className="font-bold text-center text-xl m-0 p-0">
                    In Progress
                  </p>
                </div>

                <div
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, "In Progress")}
                >
                  {project?.tasks
                    .filter((task) => task.status === "In Progress")
                    .map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        className="p-4 shadow-md my-2 bg-[#FFFBDA]"
                      >
                        <TaskDetail
                          task={task}
                          handleEditClick={handleEditClick}
                          markAsComplete={markAsComplete}
                          project={project}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* done list */}
              <div className="col-span-1">
                {" "}
                <div className="bg-[#a4ff9c] py-2 rounded">
                  <p className="font-bold text-center text-xl m-0 p-0">Done</p>
                </div>
                <div
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, "Done")}
                >
                  {project?.tasks
                    .filter((task) => task.status === "Done")
                    .map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        className="p-4 shadow-md my-2 bg-[#E2F4C5]"
                      >
                        <TaskDetail
                          task={task}
                          handleEditClick={handleEditClick}
                          markAsComplete={markAsComplete}
                          project={project}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* display team member and recent activity */}
              <div>
                <div className="grid grid-cols-1 gap-5">
                  {/* team member card */}
                  <div className="rounded-lg bg-white shadow-2xl h-fit px-5 pt-1 pb-5">
                    <p className="text-[#071952] text-xl font-bold mt-0 mb-4 p-0">
                      Team Members
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {project?.teamMembers?.map((team) => (
                        <TeamMember key={team.id} team={team} />
                      ))}
                    </div>
                  </div>

                  {/* recent activity */}
                  <div className="bg-white shadow-2xl h-fit px-5 pt-2 pb-5 rounded-lg">
                    <p className="text-[#071952] text-xl font-bold mt-0 mb-5 p-0">
                      Recent Activity
                    </p>

                    {project?.recentActivities?.map((activity) => (
                      <RecentActivity key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </>
      ) : (
        <div className="mt-4 text-black flex items-center flex-col">
          <p className="text-xl"> Project not found.</p>
          <Link href="/dashboard/projects-overview">
            <Button
              type="primary"
              className="bg-[#071952] mt-5 flex items-center gap-1 h-10"
            >
              Go to Project Overview
            </Button>
          </Link>
        </div>
      )}

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
