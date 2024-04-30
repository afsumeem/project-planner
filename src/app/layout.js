// import { StyleProvider } from "@ant-design/cssinjs";
import { ReactQueryProvider } from "@/utils/reactQueryProvider";
import "./globals.css";

export const metadata = {
  title: "Project Planner+",
  description: "Created by Afsana Meem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <ReactQueryProvider>
          {/* <StyleProvider hashPriority="high"> */}
          {children}
          {/* </StyleProvider> */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
