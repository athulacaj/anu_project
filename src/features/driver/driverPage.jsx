import React, {}  from "react";
import useDriverController from "./driverController";
import { Col, Row, Typography } from "antd";
import { hSpace, vSpace } from "../../common/components/spacing";
import { HomeCard } from "../../common/components/card";
import { MyColor } from "../../common/constants/theme";

function DriverPage() {
  const {userData,onCardClick} = useDriverController();
  return (
    <div>
        <Typography.Title level={4} style={{color:MyColor.primary}}>Hello {userData.name}</Typography.Title>
        {vSpace(20)}
        <Typography.Title level={5}>Routes</Typography.Title>
        {vSpace(20)}
        <Row gutter={12}>
        {
            userData.routes.map((route)=>{
                return (
                    <Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
                      <HomeCard title={route.toUpperCase()} onClick={onCardClick(route)} />
                    </Col>
                )
            })
        }
        </Row>
    </div>
  );
}

export default DriverPage;
