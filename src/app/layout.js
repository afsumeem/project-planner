import { ReactQueryProvider } from "@/utils/reactQueryProvider";
import "./globals.css";

export const metadata = {
  title: "Project Planner+",
  description: "Created by Afsana Meem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full m-0 p-0">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
