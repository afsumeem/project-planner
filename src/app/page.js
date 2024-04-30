import React from "react";
import dynamic from "next/dynamic";
import LoginForm from "@/components/LoginForm";

const Home = () => {
  // const LoginForm = dynamic(() => import("../components/LoginForm"), {
  //   ssr: false,
  // });

  return (
    <main className="flex items-center justify-center h-screen">
      <LoginForm />
    </main>
  );
};

export default Home;
