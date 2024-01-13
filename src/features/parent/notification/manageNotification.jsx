import { Typography } from "antd";
import React, { useContext } from "react";
import ManageParentRoute from "./route/manageRoute";
import { vSpace } from "../../common/components/spacing";
import UserContext from "../../contexts/userContext";




function ParentHome() {
  const { userData } = useContext(UserContext);
  

  return (
    <div>
      {vSpace(16)}
      <Typography.Title level={4}>Manage Notification</Typography.Title>
      {vSpace(16)}
      <ManageParentRoute />
    </div>
  );
}

export default ParentHome;
