import React from "react";
import { Button, Checkbox, Flex, Input, Modal, Table } from "antd";
import { FullPageLoader } from "../../../common/components/loaders";
import useParentController from "./parentForDiverController";
import { hSpace, vSpace } from "../../../common/components/spacing";
import { Typography } from "antd";

const { Title } = Typography;

const ManageParentsForDriver = () => {
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
    sendAllNotification
  } = useParentController();

  const { showModal, handleOk, handleCancel, isModalOpen } = modalPropeties;

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
      <Title level={4}>Parents</Title>
      <Flex>
      <Button
        onClick={sendAllNotification}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Send All Notification
      </Button>
      </Flex>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {defaultColumns
          .filter((e) => e.dataIndex.toLocaleLowerCase() !== "operation")
          .map((data) => {
            if (data.dataIndex === "route") return null;
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
        {vSpace(10)}
        {routes.map((data, index) => {
          return (
            <Checkbox
              style={{ marginRight: 10, marginBottom: 10 }}
              key={index}
              checked={newUserData.route === data.name}
              onChange={(e) =>
                setNewUserData((prv) => ({ ...prv, route: data.name }))
              }
            >
              {data.name}
            </Checkbox>
          );
        })}
      </Modal>
    </div>
  );
};
export default ManageParentsForDriver;
