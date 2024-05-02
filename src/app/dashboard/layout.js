"use client";

import { UserOutlined } from "@ant-design/icons";
import { GoProjectSymlink } from "react-icons/go";
import { Avatar } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import moment from "moment";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    key: "2",
    icon: <GoProjectSymlink />,
    label: "Project Overview",
    route: "/dashboard/projects-overview",
  },
];
// current date and time

const getCurrentDateTime = () => {
  const currentDateTime = moment().format("dddd, MMMM DD, h:mm A");

  return currentDateTime;
};

const DashboardLayout = ({ children }) => {
  const dateTime = getCurrentDateTime();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-full">
      <Sider
        className="bg-[#071952]"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          //   console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical " />

        <Menu theme="dark" mode="inline" className="mt-14 bg-[#071952]">
          <hr />
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} className="mt-6">
              <Link href={item.route}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between items-center px-8"
        >
          <p className="font-bold"> {dateTime}</p>
          <div className="flex items-center">
            <p className="px-4 font-semibold cursor-pointer">Welcome Admin</p>
            <Avatar
              size="large"
              className="bg-[#071952]"
              icon={<UserOutlined />}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Copyright ©{new Date().getFullYear()} All Rights Reserved | This
          Website is created by Afsana Meem
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
