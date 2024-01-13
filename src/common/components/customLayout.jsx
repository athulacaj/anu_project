import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import React, { useContext } from "react";
import { auth } from "../functions/firebase";
import { hSpace, vSpace } from "./spacing";
import UserContext from "../../contexts/userContext";
import { DownOutlined } from "@ant-design/icons";
import LocalizeContext from "../../contexts/loacalizeContext";
import i18next from "i18next";
import Typography from "antd/es/typography/Typography";
import { t } from "i18next";

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
  const { langState, setLangState } = useContext(LocalizeContext);
  const onLangChange = (lang) => {
    i18next.changeLanguage(lang);
    setLangState(lang);
  };

  const langDropDown = [
    { label: "English", key: "en" },
    { label: "Malayalam", key: "ml" },
    { label: "Hindi", key: "hi" },
    { label: "Tamil", key: "ta" },
  ].map((item) => ({
    key: item.key,
    label: <span onClick={() => onLangChange(item.key)}>{t(item.label)}</span>,
  }));
  const selectedLangDropDownValue = langDropDown.filter(
    (item) => item.key === langState
  )[0].label;

  console.log("langState", langState);

  const isParent = userData?.role && userData?.role === "parent";
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
        <Typography.Title level={3} style={{ color: "#fff" }}>
          RouteMaster
        </Typography.Title>
        {hSpace(10)}
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
              padding: "0 4%",
              margin: 0,
              height: "100%",
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            {vSpace(20)}

            <div style={{ marginLeft: "auto", width: "200px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Avatar size={46} icon={<UserOutlined />} />
                <div>
                  {userData?.email ?? t("label_guest")}
                  {vSpace(10)}
                  {
                    // get path from url
                    window.location.pathname.split("/")[1] !== "login" && (
                      <Button
                        style={{
                          marginLeft: "auto",
                        }}
                        onClick={() => {
                          auth.signOut();
                          window.location.href = "/login";
                        }}
                      >
                        {t("label_logout")}
                      </Button>
                    )
                  }
                  {vSpace(10)}
                  {(userData == null || isParent) && (
                    <Dropdown
                      menu={{
                        items: langDropDown,
                      }}
                      trigger={["click"]}
                    >
                      <p style={{}}>
                        {selectedLangDropDownValue}
                        <DownOutlined style={{ marginLeft: "10px" }} />
                      </p>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>
            {vSpace(20)}
            <div style={{ width: "100%" }}>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
