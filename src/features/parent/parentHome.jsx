import { Button, Checkbox, Flex, Input, Modal, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ManageParentRoute from "./route/manageRoute";
import { vSpace } from "../../common/components/spacing";
import {
  auth,
  getFcmToken,
  messaging,
  requestFcmPermission,
} from "../../common/functions/firebase";
import ParentRepository from "./parentRepository";
import UserContext from "../../contexts/userContext";
import { getMessaging, onMessage } from "firebase/messaging";
import { all } from "axios";
import { FullPageLoader } from "../../common/components/loaders";
import { use } from "i18next";
import { t } from "i18next";
import { updatePassword } from "firebase/auth";

function ParentHome() {
  const { userData } = useContext(UserContext);
  const [token, settoken] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routeInfo, setRouteInfo] = useState();
  const [allowedNotificationStops, setAllowedNotificationStops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogType, setDialogType] = useState();
  const [driverInfo, setDriverInfo] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });

  function allowNotification() {
    requestFcmPermission().then(() => {
      console.log("permission granted");
      getFcmToken().then((token) => {
        settoken(token);
        ParentRepository.updateToken(
          userData.email,
          token,
          allowedNotificationStops
        )
          .then((res) => {
            console.log(res);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
        console.log(token);
      });
    });
  }

  function getRoutesFromApi() {
    console.log(userData);
    ParentRepository.getRouteInfo(userData.route).then((res) => {
      setRouteInfo(res);
      console.log(res);
      setIsLoading(false);
    });
  }

  async function handleOk() {
    setIsLoading(true);
    if (dialogType === "notification") {
      allowNotification();
      setIsModalOpen(false);
    } else if (dialogType === "profile") {
      ParentRepository.updateUserData(userData.email, userData).then((res) => {
        console.log(res);
        setIsLoading(false);
      });
      setIsModalOpen(false);
    } else if (dialogType === "change_password") {
      if (password !== confirmPassword) {
        alert("password and confirm password should be same");
        setIsLoading(false);
        return;
      }
      try{
        setIsLoading(true);
        await updatePassword(
          auth.currentUser,
          password
        );
        setIsLoading(false);
        alert("Password updated successfully");
      }catch(err){
        console.log(err);
        alert("Auth requires recent login, please logout and login again to change password");
        setIsLoading(false);
        return;
      }
     
      setIsModalOpen(false);
    }
  }
  function handleCancel() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (userData?.allowedNotificationStops) {
      setAllowedNotificationStops(userData.allowedNotificationStops);
    }
    getRoutesFromApi();
  }, []);

  function updateNotificatioStop(stop) {
    if (allowedNotificationStops.includes(stop)) {
      let index = allowedNotificationStops.indexOf(stop);
      allowedNotificationStops.splice(index, 1);
    } else {
      allowedNotificationStops.push(stop);
    }
    setAllowedNotificationStops([...allowedNotificationStops]);
  }
  const isStopSelected = (stop) => allowedNotificationStops.includes(stop);

  if (isLoading) {
    return <FullPageLoader />;
  }
  return (
    <div>
      {/* <Button onClick={() => allowNotification()}>Allow Notification</Button> */}
      <Flex gap={6} wrap="wrap">
        <Button
          onClick={() => {
            setDialogType("change_password");
            setIsModalOpen(true);
          }}
        >
          {t("change_password")}
        </Button>
        <Button
          onClick={() => {
            setDialogType("profile");
            setIsModalOpen(true);
          }}
        >
          {t("manage_profile")}
        </Button>
        <Button
          onClick={() => {
            setDialogType("notification");
            setIsModalOpen(true);
          }}
        >
          {t("allow_notification")}
        </Button>
        <Button
          href={`tel:${driverInfo?.phoneNumber ?? "1234567890"}'}`}
          onClick={() => {
            // open call dialog in mobile
          }}
        >
          {t("call_driver")}
        </Button>
      </Flex>
      {vSpace(16)}
      <Typography.Title level={4}>{t("parent_home")}</Typography.Title>
      {vSpace(16)}
      <ManageParentRoute />
      <Modal
        title={
          dialogType === "notification"
            ? t("allow_notification")
            : dialogType === "profile"
            ? t("manage_profile")
            : t("change_password")
        }
        open={isModalOpen}
        okText={t("label_ok")}
        cancelText={t("label_cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {vSpace(16)}
        {dialogType === "notification" && (
          <AllowNotificationDialogContent
            routeInfo={routeInfo}
            allowedNotificationStops={allowedNotificationStops}
            updateNotificatioStop={updateNotificatioStop}
          />
        )}
        {dialogType === "profile" && (
          <div>
            <Typography.Text>
              {t("parent_name")}: {userData.parentName}
            </Typography.Text>
            {vSpace(16)}
            <Typography.Text>
              {t("child_name")}: {userData.studentName}
            </Typography.Text>
            {vSpace(16)}
            <Typography.Text>
              {t("parent_email")}: {userData.email}
            </Typography.Text>
            {vSpace(16)}
            <Typography.Text>
              {/* create a input field for phone */}
              <Flex gap={6}>
                <Typography.Text style={{ width: "200px" }}>
                  {t("phone_number")}:{" "}
                </Typography.Text>
                <Input
                  placeholder={t("phone_number")}
                  value={userData.phoneNumber}
                  onChange={(e) => {
                    userData.phoneNumber = e.target.value;
                  }}
                />
              </Flex>
            </Typography.Text>
          </div>
        )}
        {dialogType === "change_password" && (
          <div>
            {vSpace(16)}
            <Typography.Text style={{ width: "200px" }}>
              {t("Password must be at least 6 characters long")}
            </Typography.Text>
            {vSpace(16)}
            <Flex gap={6}>
              <Typography.Text style={{ width: "200px" }}>
                {t("label_password")}:{" "}
              </Typography.Text>
              <Input
                placeholder={t("label_password")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Flex>
            {vSpace(16)}
            <Flex gap={6}>
              <Typography.Text style={{ width: "200px" }}>
                {t("confirm_password")}:{" "}
              </Typography.Text>
              <Input
                placeholder={t("label_password")}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Flex>
          </div>
        )}
      </Modal>
    </div>
  );
}

const AllowNotificationDialogContent = ({
  routeInfo,
  allowedNotificationStops,
  updateNotificatioStop,
}) => {
  const isStopSelected = (stop) => allowedNotificationStops.includes(stop);
  console.log(allowedNotificationStops);
  console.log(isStopSelected("thirumeni"));
  return (
    <div>
      <Typography.Text>{t("select_stop_label")}</Typography.Text>
      {routeInfo &&
        routeInfo.stops.map((stop, i) => {
          return (
            <div key={i}>
              {vSpace(16)}
              <Flex>
                <div style={{ width: "150px" }}>
                  <Typography.Text>{stop}</Typography.Text>
                </div>
                <Checkbox
                  checked={isStopSelected(stop)}
                  onChange={() => updateNotificatioStop(stop)}
                ></Checkbox>
              </Flex>
            </div>
          );
        })}
    </div>
  );
};

export default ParentHome;
