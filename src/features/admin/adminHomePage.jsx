import React, { useContext, useEffect } from "react";
import { Card, Col, Divider, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {  } from "../../";
import { MyColor } from "../../common/constants/theme";
import { HomeCard } from "../../common/components/card";
import { getFcmToken, requestFcmPermission } from "../../common/functions/firebase";
import AdminRepository from "./adminRepository";
import UserContext from "../../contexts/userContext";

const style = { background: "#0092ff", padding: "8px 0" };
const parentStyle = { padding: "16px" };



function AdminHomePage() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const onCardClick = (i) => () => {
    switch (i) {
      case 1:
        navigate("/manage-parents");
        break;
      case 2:
        navigate("/manage-drivers");
        break;
      case 3:
        navigate("/manage-routes");
        break;
      default:
        console.log("Default");
        break;
    }
  };


  function allowNotification() {
    requestFcmPermission().then(() => {
      console.log("permission granted");
      getFcmToken().then((token) => {
        AdminRepository.updateToken(
          userData.email,
          token
        )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(token);
      });
    });
  }
  useEffect(() => {
    allowNotification();
  }, []);

  return (
    <div style={parentStyle}>
      <Row gutter={12}>
        <Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
          <HomeCard title="Manage Parents" onClick={onCardClick(1)} />
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} span={6}>
          <HomeCard title="Manage drivers" onClick={onCardClick(2)} />
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} span={6}>
          <HomeCard title={"Manage routes"} onClick={onCardClick(3)} />
        </Col>
        {/* <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} span={6}>
          <HomeCard />
        </Col> */}
      </Row>
    </div>
  );
}

export default AdminHomePage;
