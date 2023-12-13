import { Flex, Spin } from "antd";

function FullPageLoader() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Spin size="large" />
    </Flex>
  );
}

export  {FullPageLoader};