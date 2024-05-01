import { Timeline } from "antd";
import moment from "moment";
import React from "react";

const RecentActivity = ({ activity }) => {
  return (
    <div key={activity.id} className="tail-timeline">
      <Timeline>
        <Timeline.Item>
          <span className="font-semibold">{activity.description}</span>
          <br />
          <span className="text-gray-400">
            {moment(activity.date).format("MMM, DD")}
          </span>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default RecentActivity;
