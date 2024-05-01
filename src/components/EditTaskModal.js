import React from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";

const { Option } = Select;

const EditTaskModal = ({ visible, onCreate, onCancel, task, teamMembers }) => {
  const [form] = Form.useForm();

  // Set initial form values
  form.setFieldsValue({
    title: task?.title,
    description: task?.description,
    status: task?.status,
    dueDate: task?.dueDate,
    assignee: task?.assignee,
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      open={visible}
      title="Edit Task"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="editTaskForm">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status" }]}
        >
          <Select>
            <Option value="To Do">To Do</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ message: "Please select the due date" }]}
        >
          <DatePicker />
        </Form.Item> */}
        <Form.Item
          name="assignee"
          label="Assignee"
          rules={[{ required: true, message: "Please select the assignee" }]}
        >
          <Select>
            {teamMembers?.map((member) => (
              <Option key={member?.id} value={member?.name}>
                {member?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
