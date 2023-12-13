import { Typography } from "antd";
import React from "react";
import ManageParentRoute from "./route/manageRoute";
import { vSpace } from "../../common/components/spacing";

function ParentHome() {
  return (
    <div>
      <Typography.Title level={4}>Parent Home</Typography.Title>
      {vSpace(16)}
      <ManageParentRoute />
    </div>
  );
}

export default ParentHome;
