import React from "react";
import { Button, Dropdown, Input, Modal, Space, Table, Typography } from "antd";
import { FullPageLoader } from "../../../common/components/loaders";
import useParentController from "./driverController";
import { hSpace, vSpace } from "../../../common/components/spacing";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";

const { Title } = Typography;

const ManageDrivers = () => {
  const {
    loading,
    handleAdd,
    components,
    dataSource,
    columns,
    defaultColumns,
    modalPropeties,
    setNewUserData,
    routes,
    newUserData,
  } = useParentController();

  const { showModal, handleOk, handleCancel, isModalOpen } = modalPropeties;

  const onCheckboxChange = (index) => (e) => {
    const checked = e.target.checked;
    const selectedRoute = routes[index];
    console.log(checked);
    setNewUserData((prv) => {
      const selectedRoutes = prv.routes ?? [];
      
      if(checked) selectedRoutes.push(selectedRoute.name);
      else selectedRoutes.splice(selectedRoutes.indexOf(selectedRoute.name), 1);
      
      
      
      console.log(selectedRoutes);
      return {
        ...prv,
        routes: selectedRoutes,
      };
    });
  };

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div
      style={{
        maxWidth: "100%",
        overflow: "auto",
      }}
    >
      <Title level={3}>Manage Drivers</Title>
      {hSpace(20)}
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Modal
        title="Add Driver"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {hSpace(20)}
        {defaultColumns
          .filter((e) => e.title.toLocaleLowerCase() !== "operation")
          .map((data) => {
            if (data.dataIndex === "routes") return null;
            return (
              <div>
                <p>{data.title} </p>
                <Input
                  placeholder=""
                  onChange={(e) =>
                    setNewUserData((prv) => ({
                      ...prv,
                      [data.dataIndex]: e.target.value,
                    }))
                  }
                />
                {vSpace(10)}
              </div>
            );
          })}
        {hSpace(20)}
        <p>Routes</p>
        {routes.map((data, index) => {
          return (
            <Checkbox
              style={{ marginRight: 10, marginBottom: 10 }}
              key={index}
              checked={(newUserData.routes ?? []).includes(data.name)}
              onChange={onCheckboxChange(index)}
            >
              {data.name}
            </Checkbox>
          );
        })}
      </Modal>
    </div>
  );
};
export default ManageDrivers;
