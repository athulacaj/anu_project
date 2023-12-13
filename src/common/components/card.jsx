import { Card } from "antd";

import { Typography } from "antd";
const { Title } = Typography;

const HomeCard = ({ title, description, onClick }) => {
  return (
    <Card
      hoverable
      bordered
      style={{ width: "100%", marginBottom: "12px" }}
      onClick={onClick}
    >
      <Title
        // code
        level={4}
        style={{
          color: "red !important",
        }}
      >
        {title}
      </Title>
      <p>{description}</p>
    </Card>
  );
};

export { HomeCard};