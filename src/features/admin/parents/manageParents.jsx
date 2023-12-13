import React from "react";
import { Button, Checkbox, Input, Modal, Table } from "antd";
import { FullPageLoader } from "../../../common/components/loaders";
import useParentController from "./parentController";
import { hSpace, vSpace } from "../../../common/components/spacing";
import { Typography } from "antd";

const { Title } = Typography;

const ManageParents = () => {
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
      <Title level={3}>Manage Parents</Title>
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
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {defaultColumns
          .filter((e) => e.title.toLocaleLowerCase() !== "operation")
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
export default ManageParents;
