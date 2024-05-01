"use client";

import { RiTeamFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { useAllProjects } from "@/store/store";

const DashboardHome = () => {
  const { projects } = useAllProjects();

  // total tasks

  const totalTasks = projects.reduce(
    (total, project) => total + project.tasks.length,
    0
  );

  // total team members

  const totalTeamMembers = projects.reduce(
    (total, project) => total + project.teamMembers.length,
    0
  );
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#378CE7] rounded-xl px-6 py-3 flex items-center gap-6">
          <GrProjects className="text-4xl text-white" />
          <div>
            <p className="text-xl text-white font-bold m-0 p-0">
              Total Projects
            </p>
            <p className="text-4xl text-white font-bold m-0 p-0">
              {projects.length}
            </p>
          </div>
        </div>
        <div className="bg-[#378CE7] rounded-xl px-6 py-3  flex items-center gap-6">
          <FaTasks className="text-4xl text-white" />
          <div>
            <p className="text-xl text-white font-bold m-0 p-0">Total Tasks</p>
            <p className="text-4xl text-white font-bold m-0 p-0">
              {totalTasks}
            </p>
          </div>
        </div>
        <div className="bg-[#378CE7] rounded-xl px-6 py-3  flex items-center gap-6">
          <RiTeamFill className="text-4xl text-white" />
          <div>
            <p className="text-xl text-white font-bold m-0 p-0">
              Total Team Members
            </p>
            <p className="text-4xl text-white font-bold m-0 p-0">
              {totalTeamMembers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
