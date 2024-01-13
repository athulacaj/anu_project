import React, { useEffect } from "react";
import useDriverController from "./driverController";
import { Button, Col, Row, Typography } from "antd";
import { hSpace, vSpace } from "../../common/components/spacing";
import { HomeCard } from "../../common/components/card";
import { MyColor } from "../../common/constants/theme";
import {
  getFcmToken,
  requestFcmPermission,
} from "../../common/functions/firebase";
import DriverRepository from "./driverRepository";

function DriverPage() {
  const { userData, onCardClick, allowNotification, sendNotificationToAdmin } =
    useDriverController();

  useEffect(() => {
    allowNotification();
  }, []);

  return (
    <div>
      <Typography.Title level={4} style={{ color: MyColor.primary }}>
        Hello {userData.name}
      </Typography.Title>
      {vSpace(20)}
      <Button type="primary" onClick={sendNotificationToAdmin}>
        Send Notification To Admin
      </Button>
      {vSpace(20)}
      <Typography.Title level={5}>Routes</Typography.Title>
      {vSpace(20)}
      <Row gutter={12}>
        {userData.routes.map((route) => {
          return (
            <Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
              <HomeCard
                title={route.toUpperCase()}
                onClick={onCardClick(route)}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default DriverPage;
