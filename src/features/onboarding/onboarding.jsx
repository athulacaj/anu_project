/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { auth } from "../../common/functions/firebase";
import { Button, Flex, Spin } from "antd";
import OnboardRepository from "./onboard_repository";
import AdminHomePage from "../admin/adminHomePage";
import { vSpace } from "../../common/components/spacing";
import { FullPageLoader } from "../../common/components/loaders";
import DriverPage from "../driver/driverPage";
import ParentHome from "../parent/parentHome";



function OnboardingPage() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData == null) {
      navigate("/login");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div />;
  }

  return (
    <div>
      {/* {vSpace(10)} */}
      {userData && userData.role === "admin" ? (
        <AdminHomePage />
      ) :userData && userData.role === "driver" ? (
        <DriverPage />
      ):
      (
        <ParentHome />
      )}
    </div>
  );
}

export { OnboardingPage };



