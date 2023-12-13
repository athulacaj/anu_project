import { Button, Input, Modal, Typography } from "antd";
import React from "react";
import { Collapse } from "antd";
import { vSpace } from "../../../common/components/spacing";
import { FullPageLoader } from "../../../common/components/loaders";
import { use } from "i18next";
import useRouteController from "./mangeRoutesController";

function ManageRoutes() {
  const {
    loading,
    items,
    modalPropeties,
    handleAdd,
    stops,
    setStops,
    newRouteData,
    setNewRouteData,
  } = useRouteController();
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
      <Typography.Title level={3}>Manage Routes</Typography.Title>
      {vSpace(12)}
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add
      </Button>
      {vSpace(12)}
      <Collapse accordion items={items} />
      <Modal
        title="Add Route"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Route Name</label>
        {vSpace(2)}
        <Input
          placeholder="Enter Route Name"
          onChange={(e) =>
            setNewRouteData((prv) => ({ ...prv, name: e.target.value }))
          }
        />
        {vSpace(6)}
        <label>Stops</label>
        {vSpace(2)}
        {stops.map((stop, index) => {
          return (
            <div key={index}>
              <Input
                placeholder="Enter Stop Name"
                onChange={(e) =>
                  setStops((prv) => {
                    prv[index] = e.target.value;
                    return [...prv];
                  })
                }
              />
              {vSpace(4)}
            </div>
          );
        })}
        {vSpace(8)}
        <Button type="primary" onClick={() => setStops([...stops, ""])}>
          Add Stop
        </Button>
      </Modal>
    </div>
  );
}

export default ManageRoutes;
