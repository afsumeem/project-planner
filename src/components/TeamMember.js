/* eslint-disable @next/next/no-img-element */
import React from "react";

const TeamMember = ({ team }) => {
  return (
    <div
      className="flex gap-2 items-center pb-3 "
      style={{ borderBottom: "1px solid #B3C8CF" }}
    >
      <img
        src={team?.img}
        className="h-11 rounded-full"
        style={{ border: "1px solid #E2F4C5", padding: "2px" }}
        alt=""
      />
      <div>
        <p className="m-0 text-lg font-bold">{team?.name}</p>
        <p className="m-0 text-gray-500 text-sm">{team?.role}</p>
      </div>
    </div>
  );
};

export default TeamMember;
