import React from "react";
import { useParams } from "react-router-dom";
import useParentRouteController from "./controller";
import { FullPageLoader } from "../../../common/components/loaders";
import { hSpace, vSpace } from "../../../common/components/spacing";
import { Button, Flex, Timeline } from "antd";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { t } from "i18next";

const RoutesInfo = ({ routes }) => (
  <Timeline
    items={routes.map((route) => ({ children: route, color: "grey" }))}
  />
);

function getTime(time) {
  if (time == null || time === undefined || time === "") {
    return "";
  }
  var date = new Date(time);
  var hour = date.getHours();
  var minute = date.getMinutes();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  var formattedDateTime = `${hour < 10 ? "0" : ""}${hour}:${
    minute < 10 ? "0" : ""
  }${minute}`;

  console.log(date);
  return " - " + hour + ":" + minute;
}

const TravelRouteListing = ({ travelData }) => {
  const timer = <ClockCircleOutlined style={{ fontSize: "16px" }} />;
  const check = <CheckCircleOutlined style={{ fontSize: "16px" }} />;

  const items = travelData.stopsData.map((stopData) => ({
    // stopData.time
    // time in milliseconds since epoch to dateTime
    children: stopData.stop + getTime(stopData.time),
    dot: !stopData.isVisited ? timer : check,
    color: stopData.isVisited ? "green" : "grey",
    // label: '9:12',
  }));
  return <Timeline node="left" items={items} />;
};

const getFirstNotVisitedStop = (stopsData) => {
  const a = stopsData.find((stopData) => !stopData.isVisited);
  console.log(a);
  return a;
};

function ManageParentRoute() {
  const { routeInfo, isLoading, travelData } = useParentRouteController();

  function viewOnMap() {
    // https://www.google.com/maps/search/?api=1&query=58.698017,-152.522067
    // open a new tab with the url
    const path = `https://www.google.com/maps/search/?api=1&query=${travelData.lat},${travelData.long}`;

    window.open(path, "_blank");
  }

  if (isLoading) {
    return <FullPageLoader />;
  }
  return (
    <div style={{ maxWidth: "600px" }}>
      {travelData == null || travelData?.completed ? (
        <div>
          <p></p>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap-reverse" }}>
            <div>
              <h4>{travelData.path.join(" to ")}</h4>
              {vSpace(30)}
              <Button onClick={viewOnMap}>{t('view_on_map')}</Button>
              {vSpace(30)}
              <TravelRouteListing travelData={travelData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageParentRoute;
