import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useDriverRouteController from "./controller";
import { FullPageLoader } from "../../../common/components/loaders";
import { hSpace, vSpace } from "../../../common/components/spacing";
import { Button, Checkbox, Flex, Modal, Timeline, Typography } from "antd";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import ManageParentsForDriver from "../parents/manageDriverParents";
import { t } from "i18next";

const RoutesInfo = ({ routes }) => (
  <Timeline
    items={routes.map((route) => ({ children: route, color: "grey" }))}
  />
);

const TravelRouteListing = ({ travelData }) => {
  const timer = <ClockCircleOutlined style={{ fontSize: "16px" }} />;
  const check = <CheckCircleOutlined style={{ fontSize: "16px" }} />;
  const items = travelData.stopsData.map((stopData) => ({
    children: stopData.stop,
    dot: !stopData.isVisited ? timer : check,
    color: stopData.isVisited ? "green" : "grey",
  }));
  return <Timeline items={items} />;
};

const getFirstNotVisitedStop = (stopsData) => {
  const a = stopsData.find((stopData) => !stopData.isVisited);
  console.log(a);
  return a;
};

function ManageDriverRoute() {
  const {
    routeInfo,
    isLoading,
    startRoute,
    travelData,
    markCompleted,
    endJouney,
    students,
    isModalOpen,
    handleOk,
    handleCancel,
  } = useDriverRouteController();

  function CompleteButton() {
    const lastNotCompletedRoute = getFirstNotVisitedStop(travelData.stopsData);
    if (!lastNotCompletedRoute) {
      return null;
    }
    return (
      <Button onClick={() => markCompleted(lastNotCompletedRoute)}>
        mark `{lastNotCompletedRoute.stop}` completed
      </Button>
    );
  }
  const isNotStarted = travelData == null || travelData?.completed;



  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => { 
    getLocation();
  }, []);


  if (isLoading) {
    return <FullPageLoader />;
  }
  
  return (
    <div>
      <Modal
        title={t("take_attendance")}
        open={isModalOpen}
        okText={t("label_ok")}
        cancelText={t("label_cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
   {
           students.map((student, i) => {
            return (
              <div key={i}>
                {vSpace(16)}
                <Flex>
                  <div style={{ width: "150px" }}>
                    <Typography.Text>{student.studentName}</Typography.Text>
                  </div>
                  <Checkbox
                    // checked={isStopSelected(stop)}
                    // onChange={() => updateNotificatioStop(stop)}
                  ></Checkbox>
                </Flex>
              </div>
            );
          })
        }

      </Modal>


      <div style={{ maxWidth: "500px" }}>
        {isNotStarted ? (
          <div>
            <h4>Route Info</h4>
            {vSpace(40)}
            {routeInfo != null && (
              <RoutesInfo routes={routeInfo?.stops ?? []} />
            )}
            {vSpace(10)}
            <h4>Start Journey</h4>
            {vSpace(10)}
            <Flex>
              <Button onClick={() => startRoute(true)}>Straight</Button>
              {hSpace(10)}
              <Button onClick={() => startRoute(false)}>Reverse</Button>
            </Flex>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap-reverse" }}>
              <div>
                <h4>{travelData.path.join(" to ")}</h4>
                {vSpace(30)}
                <TravelRouteListing travelData={travelData} />
              </div>
              {hSpace(30)}
              <div style={{ margin: "auto", xs: "" }}>
                <CompleteButton />
                {vSpace(10)}
                <Button onClick={endJouney}>End Journey</Button>
                {vSpace(20)}
              </div>
            </div>
          </div>
        )}
      </div>
      {}
      {vSpace(40)}
      <div style={{ width: "100%" }}>
        <ManageParentsForDriver />
      </div>
    </div>
  );
}

export default ManageDriverRoute;
