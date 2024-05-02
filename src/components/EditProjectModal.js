"use client";

import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const EditProjectModal = ({ visible, onUpdate, onCancel, project }) => {
  const [form] = Form.useForm();

  // Set initial form values
  useEffect(() => {
    form.setFieldsValue({
      name: project?.name,
      description: project?.description,
    });
  }, [visible, project, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onUpdate(project.id, values);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  return (
    <Modal
      open={visible}
      title="Edit Project"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="editProjectForm">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ message: "Please enter new project Name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ message: "Please enter updated description" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProjectModal;
