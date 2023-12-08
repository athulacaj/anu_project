import { Flex, Spin } from "antd";

function FullPageLoader() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Spin size="large" />
    </Flex>
  );
}

export  {FullPageLoader};