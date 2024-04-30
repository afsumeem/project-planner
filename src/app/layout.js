// import { StyleProvider } from "@ant-design/cssinjs";
import "./globals.css";

export const metadata = {
  title: "Project Planner+",
  description: "Created by Afsana Meem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        {/* <StyleProvider hashPriority="high"> */}
        {children}

        {/* </StyleProvider> */}
      </body>
    </html>
  );
}
