import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
const { Option } = Select;

const AddTaskModal = ({ visible, onCreate, onCancel, teamMembers }) => {
  const [form] = Form.useForm();

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
      title="Add New Task"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="addTaskForm">
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
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Please select the due date" }]}
        >
          <DatePicker />
        </Form.Item>
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

export default AddTaskModal;
