import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Flex, Layout, Menu, theme } from "antd";
import React, { useContext } from "react";
import { auth } from "../functions/firebase";
import { hSpace } from "./spacing";
import UserContext from "../../contexts/userContext";
const { Header, Content, Sider } = Layout;

const items1 = [1, 2, 3].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const CustomLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { userData, setUserData } = useContext(UserContext);

  return (
    <Layout
      style={{
        minHeight: "100%",
        height: "100%",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        /> */}
        {hSpace(10)}
        {
          // get path from url
          window.location.pathname.split("/")[1] != "login" && (
            <Button
              type="primary"
              style={{
                marginLeft: "auto",
              }}
              onClick={() => {
                auth.signOut();
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          )
        }
      </Header>
      <Layout>
        {/* <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items2}
            />
          </Sider> */}
        <Layout
          style={{
            height: "100%",
            padding: "0 3% 3%",
          }}
        >
          <Content
            style={{
              padding: "4%",
              margin: 0,
              height: "100%",
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <div style={{ width: "100%", height: "100%"}}>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
