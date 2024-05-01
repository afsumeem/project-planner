"use client";

import React from "react";
import { Form, Input, Button, message } from "antd";

import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // user authentication
    const { email, password } = values;
    if (email === "afsana@gmail.com" && password === "abcd1234") {
      message.success("Login successful");
      router.push("/dashboard");
    } else {
      message.error("Invalid username or password");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "Not a valid email!",
    },
  };

  return (
    <div className="w-full h-full flex justify-center items-center  login-page-container bg-cover m-0 p-0">
      <div className="w-full md:w-1/2 lg:w-1/4 rounded-xl m-0 p-10 login-container">
        <Form
          form={form}
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item name="username">
            <label htmlFor="username" className="text-white pb-3 text-base">
              UserName
            </label>
            <Input />
          </Form.Item>
          <label htmlFor="email" className="text-white pb-3 text-base">
            Email
          </label>
          <Form.Item name="email" type="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <label htmlFor="email" className="text-white pb-3 text-base">
            Password
          </label>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="w-full mt-3" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
