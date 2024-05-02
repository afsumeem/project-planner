import { Button, Tooltip } from "antd";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { FaRegCalendarMinus } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

const TaskDetail = ({ task, handleEditClick, markAsComplete, project }) => {
  const isTaskCompleted = task?.status === "Done";

  return (
    <div>
      {" "}
      <div className="flex justify-between items-center">
        <p
          className={`font-semibold text-sm px-4 py-2 m-0 p-0 rounded-lg ${
            task?.status === "To Do"
              ? "bg-[#ffb6ac]"
              : task?.status === "In Progress"
              ? "bg-[#f7f89a]"
              : task.status === "Done"
              ? "bg-[#E2F4C5]"
              : "bg-inherit"
          }`}
        >
          {task?.title}
        </p>
        <Tooltip placement="topLeft" title="Mark as Complete">
          <button
            onClick={() => markAsComplete(project?.id, task?.id)}
            className="border-0 bg-inherit text-lg cursor-pointer"
          >
            <FaCircleCheck
              style={{ color: isTaskCompleted ? "green" : "inherit" }}
            />
          </button>
        </Tooltip>
      </div>
      <p>{task?.description}</p>
      <div>
        {task?.assignee ? (
          <>
            <p className="flex items-center font-semibold m-0 p-0">
              Assignee:
              <span className="ml-2 flex items-center">
                <CiUser />
                {task?.assignee}
              </span>
            </p>
          </>
        ) : (
          <>
            <Button
              className="bg-[#071952] text-white flex justify-end items-center gap-1"
              onClick={() => handleEditClick(task)}
            >
              <CiEdit /> Assign Member
            </Button>
          </>
        )}
      </div>
      <p className="font-semibold m-0 p-0">Status: {task?.status}</p>
      <div className="flex justify-between items-center gap-1">
        <p className="flex gap-1 items-center font-semibold">
          <FaRegCalendarMinus />
          {task?.dueDate}
        </p>
        <Button
          onClick={() => handleEditClick(task)}
          className="flex justify-end items-center gap-1 bg-[#071952] text-white"
        >
          <CiEdit /> Edit
        </Button>
      </div>
    </div>
  );
};

export default TaskDetail;
