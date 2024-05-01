import { Input, DatePicker, Select, Button } from "antd";
import { CiSearch } from "react-icons/ci";
import moment from "moment";
import { FaCirclePlus } from "react-icons/fa6";

const { Option } = Select;

const ProjectDetailHeader = ({
  searchTerm,
  handleSearch,
  statusFilter,
  handleFilter,
  assigneeFilter,
  project,
  dueDateFilter,
  showModal,
  handleDueDateFilter,
  handleAssigneeFilter,
}) => {
  const handleDatePickerChange = (date, dateString) => {
    handleDueDateFilter(dateString);
  };

  // Custom date
  const dateCellRender = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (
      formattedDate === moment(dueDateFilter, "YYYY-MM-DD").format("YYYY-MM-DD")
    ) {
      return (
        <div style={{ backgroundColor: "green", color: "white" }}>
          {date.date()}
        </div>
      );
    }
    return date.date();
  };
  return (
    <div className="flex justify-between mb-4">
      <div className="flex gap-2">
        {/* search input */}
        <Input
          type="text"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-500"
          prefix={<CiSearch />}
        />

        {/* status filter */}
        <Select
          value={statusFilter}
          onChange={(value) => handleFilter(value)}
          style={{ border: "1px solid gray", borderRadius: "7px" }}
        >
          <Option value="All">All Status</Option>
          <Option value="To Do">To Do</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>

        {/* task assignee filter */}
        <Select
          value={assigneeFilter}
          onChange={(value) => handleAssigneeFilter(value)}
          // className="border border-gray-700"
          style={{ border: "1px solid gray", borderRadius: "7px" }}
        >
          <Option value="">All Assignees</Option>
          {project?.teamMembers?.map((team) => (
            <Option key={team?.id} value={team?.name}>
              {team?.name}
            </Option>
          ))}
        </Select>

        {/* due date filter */}
        <DatePicker
          value={dueDateFilter ? moment(dueDateFilter, "YYYY-MM-DD") : null}
          onChange={handleDatePickerChange}
          className="border border-gray-500"
          cellRender={dateCellRender}
        />
      </div>

      {/*  */}

      <Button
        type="primary"
        className="bg-[#071952] flex items-center gap-1 h-10"
        onClick={showModal}
      >
        <FaCirclePlus /> Add new task
      </Button>
    </div>
  );
};

export default ProjectDetailHeader;
