import React from "react";
import { useParams } from "react-router-dom";
import useDriverRouteController from "./controller";
import { FullPageLoader } from "../../../common/components/loaders";
import { hSpace, vSpace } from "../../../common/components/spacing";
import { Button, Flex, Timeline } from "antd";
import { ClockCircleOutlined,CheckCircleOutlined } from "@ant-design/icons";

const RoutesInfo = ({ routes }) => (
  <Timeline
    items={routes.map((route) => ({ children: route, color: "grey" }))}
  />
);

const TravelRouteListing = ({ travelData }) => {
  const timer = <ClockCircleOutlined style={{ fontSize: "16px" }} />;
  const check=<CheckCircleOutlined style={{ fontSize: "16px" }} />
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
  const { routeInfo, isLoading, startRoute, travelData, markCompleted,endJouney } =
    useDriverRouteController();

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

  if (isLoading) {
    return <FullPageLoader />;
  }
  return (
    <div style={{ maxWidth: "500px"}}>
      {travelData == null||travelData?.completed ? (
        <div>
          <h4>Route Info</h4>
          {vSpace(40)}
          {routeInfo != null && <RoutesInfo routes={routeInfo?.stops ?? []} />}
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
          <div style={{display:"flex",flexWrap:"wrap-reverse"}}>
            <div>
              <h4>{travelData.path.join(" to ")}</h4>
              {vSpace(30)}
              <TravelRouteListing travelData={travelData} />
            </div>
            {hSpace(30)}
            <div style={{ margin: "auto" ,xs:""}}>
              <CompleteButton />
                {vSpace(10)}
              <Button onClick={endJouney}>End Journey</Button>
              {vSpace(20)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageDriverRoute;
