import React from "react";

import LoginForm from "@/components/LoginForm";
import "antd/dist/reset.css";

//
const Home = () => {
  return (
    <main className="flex items-center justify-center h-screen">
      <LoginForm />
    </main>
  );
};

export default Home;
