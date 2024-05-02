"use client";

import { RiTeamFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { useAllProjects } from "@/store/store";
import { SiTicktick } from "react-icons/si";
import RecentActivity from "@/components/RecentActivity";
import TeamMember from "@/components/TeamMember";
import { Button } from "antd";
import { FaCirclePlus } from "react-icons/fa6";
import Link from "next/link";

const DashboardHome = () => {
  // all post from store
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

  // finished task
  const totalDoneTasksLength = projects.reduce((total, project) => {
    const doneTasksInProject = project.tasks.filter(
      (task) => task.status === "Done"
    ).length;
    return total + doneTasksInProject;
  }, 0);

  //recent activities
  const recentActivities = projects
    .reduce((recent, project) => {
      return recent.concat(project.recentActivities.slice(0, 4));
    }, [])
    .slice(0, 4);

  // top performers

  const topPerformers = projects
    .reduce((performer, project) => {
      return performer.concat(project.teamMembers.slice(0, 6));
    }, [])
    .slice(0, 6);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
        {/* total project */}
        <div className="bg-[#071952] rounded-xl px-6 py-1 md:py-3 flex items-center gap-6">
          <GrProjects className="text-4xl text-gray-200" />
          <div>
            <p className="text-lg text-gray-200 font-bold m-0 p-0">
              Total Projects
            </p>
            <p className="text-xl md:text-4xl text-gray-200 font-bold m-0 p-0">
              {projects.length}
            </p>
          </div>
        </div>

        {/* total task */}
        <div className="bg-[#071952] rounded-xl px-6 py-1 md:py-3  flex items-center gap-6">
          <FaTasks className="text-4xl text-gray-200" />
          <div>
            <p className="text-lg text-gray-200 font-bold m-0 p-0">
              Total Tasks
            </p>
            <p className="text-xl md:text-4xl  text-gray-200 font-bold m-0 p-0">
              {totalTasks}
            </p>
          </div>
        </div>

        {/* finished project */}

        <div className="bg-[#071952] rounded-xl px-6 py-1 md:py-3  flex items-center gap-6">
          <SiTicktick className="text-4xl text-gray-200" />
          <div>
            <p className="text-lg text-gray-200 font-bold m-0 p-0">
              Finished Tasks
            </p>
            <p className="text-xl md:text-4xl  text-gray-200 font-bold m-0 p-0">
              {totalDoneTasksLength}
            </p>
          </div>
        </div>
        {/*total team members */}
        <div className="bg-[#071952] rounded-xl px-6 py-1 md:py-3  flex items-center gap-6">
          <RiTeamFill className="text-4xl text-gray-200" />
          <div>
            <p className="text-lg text-gray-200 font-bold m-0 p-0">
              Team Members
            </p>
            <p className="text-xl md:text-4xl  text-gray-200 font-bold m-0 p-0">
              {totalTeamMembers}
            </p>
          </div>
        </div>
      </div>

      {/* all projects btn */}
      <Link href="/dashboard/projects-overview">
        <Button
          type="primary"
          className="bg-[#071952] mt-5 flex items-center gap-1 h-10"
        >
          Go to Project Overview
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        <div className="bg-white shadow-2xl  px-5 pt-2 pb-5 mt-7 rounded-lg">
          <p className="text-[#071952] text-xl font-bold mt-0 mb-5 p-0">
            Recent Activity
          </p>

          {recentActivities.map((activity, index) => (
            <RecentActivity key={index} activity={activity} />
          ))}
        </div>

        {/* top performers */}
        <div className="bg-white shadow-2xl px-5 pt-2 pb-5 mt-7 rounded-lg">
          <p className="text-[#071952] text-xl font-bold mt-0 mb-5 p-0">
            Top Performers
          </p>
          <div className="grid grid-cols-2 gap-5">
            {topPerformers.map((team, index) => (
              <TeamMember key={index} team={team} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
