"use client";

import EditProjectModal from "@/components/EditProjectModal";
import projectStore from "@/store/store";
import { useAllProjects } from "@/store/store";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Space, Table, Tag } from "antd";

//

const ProjectsOverview = () => {
  const { projects } = useAllProjects();

  // delete project
  const handleDelete = (projectId) => {
    console.log(projectId);
    projectStore.getState().deleteProject(projectId);
  };

  //
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => ({
        children: text,
        props: {
          style: {
            background: index % 2 === 0 ? "#f0f0f0" : "#D2DAFF",
            textAlign: "center",
          },
        },
      }),
      title: () => (
        <div className="text-center">
          <span style={{ color: "#ffffff" }}>ID</span>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => ({
        children: <a className="text-blue-800 hover:text-blue-800">{text}</a>,
        props: {
          style: {
            background: index % 2 === 0 ? "#f0f0f0" : "#D2DAFF",
            textAlign: "center",
          },
        },
      }),
      title: () => (
        <div className="text-center">
          <span style={{ color: "#ffffff" }}>Name</span>
        </div>
      ),
    },

    {
      title: "Total Task",
      dataIndex: "tasks",
      key: "tasks",
      render: (tasks, record, index) => ({
        children: tasks.length,
        props: {
          style: {
            background: index % 2 === 0 ? "#f0f0f0" : "#D2DAFF",
            textAlign: "center",
          },
        },
      }),
      title: () => (
        <div className="text-center">
          <span style={{ color: "#ffffff" }}>Total Tasks</span>
        </div>
      ),
    },
    {
      title: "View Details",
      dataIndex: "view",
      key: "view",
      render: (text, record, index) => ({
        children: (
          <Link href={`/dashboard/projects-overview/${record.id}`}>View</Link>
        ),
        props: {
          style: {
            background: index % 2 === 0 ? "#f0f0f0" : "#D2DAFF",
            textAlign: "center",
          },
        },
      }),
      title: () => (
        <div className="text-center">
          <span style={{ color: "#ffffff" }}>View Details</span>
        </div>
      ),
    },
    {
      title: "Edit Project",
      dataIndex: "edit",
      key: "edit",
      render: (text, record, index) => ({
        children: <EditProjectModal />,
        props: {
          style: {
            background: index % 2 === 0 ? "#f0f0f0" : "#D2DAFF",
            textAlign: "center",
          },
        },
      }),
      title: () => (
        <div className="text-center">
          <span style={{ color: "#ffffff" }}>Edit Project</span>
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record, index) => ({
        children: (
          <button
            className="border-0 bg-inherit font-bold flex items-center justify-center w-full gap-1 text-red-600 cursor-pointer"
            onClick={() => handleDelete(record.id)}
          >
            <RiDeleteBin6Line /> Delete
          </button>
        ),
        props: {
          style: {
            background: index % 2 === 0 ? "#f0f0f0" : "#D2DAFF",
            textAlign: "center",
          },
        },
      }),
      title: () => (
        <div className="text-center">
          <span style={{ color: "#ffffff" }}>Delete</span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        bordered
        size="middle"
        title={() => (
          <div>
            <p className="my-2 font-bold text-xl">Project Overview</p>
          </div>
        )}
        dataSource={projects}
      />
      {/* {projects &&
        projects.map((data) => (
          <div key={data.id}>
            <h2>{data.name}</h2>
            <Link href={`/dashboard/projects-overview/${data.id}`}>View</Link>
            <EditProjectModal />
            <button onClick={() => handleDelete(data.id)}>Delete</button>
          </div>
        ))} */}
    </div>
  );
};

export default ProjectsOverview;
