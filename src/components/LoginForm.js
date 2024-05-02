"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { FaRegCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  // user
  const [userId, setUserId] = useState("test@gmail.com");
  const [password, setPassword] = useState("abcd1234");
  const [userIdCopied, setUserIdCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  // user
  const handleCopyUserId = () => {
    setUserIdCopied(true);
    setTimeout(() => setUserIdCopied(false), 1000);
  };

  const handleCopyPassword = () => {
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 1000);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // user authentication
    const { email, password } = values;
    if (email === "test@gmail.com" && password === "abcd1234") {
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
        <p className="m-0 p-0 mb-5 text-white text-center font-bold text-xl">
          Project Planner+
        </p>
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
        <div className="flex gap-4 justify-center">
          <CopyToClipboard text={userId} onCopy={handleCopyUserId}>
            <div className="flex items-center gap-2 cursor-pointer">
              <p className="text-base text-white">{userId}</p>
              <FaRegCopy className="text-white " />
            </div>
          </CopyToClipboard>

          <CopyToClipboard text={password} onCopy={handleCopyPassword}>
            <div className="flex gap-2 items-center cursor-pointer">
              <p className="text-base text-white">{password} </p>

              <FaRegCopy className="text-white " />
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
