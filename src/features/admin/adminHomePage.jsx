import React from "react";
import { Card, Col, Divider, Row } from "antd";
import { useNavigate } from "react-router-dom";

const style = { background: "#0092ff", padding: "8px 0" };
const parentStyle = { padding: "16px" };

const HomeCard = ({ title, description, onClick }) => {
  return (
    <Card style={{ width: "100%","marginBottom":"12px"}} onClick={onClick}>
      <p>{title}</p>
      <p>{description}</p>
    </Card>
  );
};

function AdminHomePage() {
  const navigate = useNavigate();

  const onCardClick = (i) =>()=> {
    switch (i) {
      case 1:
        navigate("/manage-parents");
        break;
      case 2:
        console.log("Manage Drivers");
        break;
      case 3:
        console.log("Manage Routes");
        break;
      default:
        console.log("Default");
        break;
    }
  };
  
  return (
    <div style={parentStyle}>
      <Row gutter={12} >
        <Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
          <HomeCard  title="Manage Parents" onClick={onCardClick(1)} />
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} span={6}>
          <HomeCard title="Manage drivers" onClick={onCardClick(1)}/>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} span={6}>
          <HomeCard title={"Manage routes"} onClick={onCardClick(1)}/>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} span={6}>
          <HomeCard />
        </Col>
      </Row>
    </div>
  );
}

export default AdminHomePage;
