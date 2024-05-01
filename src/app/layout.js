import { ReactQueryProvider } from "@/utils/reactQueryProvider";
import "./globals.css";

import { AntStyleProvider } from "@/utils/AntStyleProvider";

export const metadata = {
  title: "Project Planner+",
  description: "Created by Afsana Meem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen m-0 p-0">
        {/* <AntStyleProvider> */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
        {/* </AntStyleProvider> */}
      </body>
    </html>
  );
}
