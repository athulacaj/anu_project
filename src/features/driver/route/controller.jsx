import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DriverRepository from "../driverRepository";
import { serverTimestamp } from "firebase/firestore";

function useDriverRouteController() {
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState();
  const { route } = useParams();
  const [travelData, setTravelData] = useState(null);
  const initialized = useRef(false);

  function startRoute(isStraight) {
    const stopsData = (
      isStraight ? routeInfo.stops : routeInfo.stops.reverse()
    ).map((stop) => ({
      stop: stop,
      isVisited: false,
    }));
    const path = isStraight
      ? [routeInfo.stops[0], routeInfo.stops[routeInfo.stops.length - 1]]
      : [routeInfo.stops[routeInfo.stops.length - 1], routeInfo.stops[0]];
    setTravelData({
      name: route,
      isStraight,
      path,
      stopsData,
      info: routeInfo,
      completed: false,
    });
  }

  useEffect(() => {
    if (initialized.current&&travelData!=null) {
      DriverRepository.saveTravelData(travelData);
    } else {
      initialized.current = true;
    }
  }, [travelData]);

  function markCompleted(stopData) {
    console.log(stopData);
    const newTravelData = { ...travelData };
    const stopIndex = newTravelData.stopsData.findIndex(
      (stop) => stop.stop === stopData.stop
    );
    newTravelData.stopsData[stopIndex].isVisited = true;
    newTravelData.stopsData[stopIndex].time = Date.now();
    console.log(newTravelData);
    alert(stopData.stop + " marked as completed");
    setTravelData(newTravelData);
  }

  function endJouney() {
    setTravelData((prv) => ({ ...prv, completed: true }));
  }

  async function fetchData() {
    await DriverRepository.getRouteInfo(route)
      .then((res) => {
        console.log(res);
        setRouteInfo(res);
      })
      .catch((err) => {
        alert(err);
      });
    await DriverRepository.getTravelData(route)
      .then((res) => {
        console.log(res);
        setTravelData(res);
      })
      .catch((err) => {
        alert(err);
      });
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    routeInfo,
    isLoading,
    startRoute,
    travelData,
    markCompleted,
    endJouney,
  };
}

export default useDriverRouteController;
