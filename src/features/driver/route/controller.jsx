import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DriverRepository from "../driverRepository";
import { serverTimestamp } from "firebase/firestore";
import { t } from "i18next";

function useDriverRouteController() {
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState();
  const { route } = useParams();
  const [travelData, setTravelData] = useState(null);
  const initialized = useRef(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [students, setStudents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  async function takeAttendance() {
    setIsLoading(true);
    await DriverRepository.takeAttendance(students)
      .then((res) => {
        console.log(res);
        setTravelData(res);
      })
    setIsLoading(false);
  }
  

  function startRoute(isStraight) {
    setModalOpen(true);

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
    sendFcm("Bus started", `Bus started moving from ${path[0]} to ${path[1]}`);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        // if the location is not changed then don't update
        if (lat === latitude && long === longitude) {
          console.log("location not changed");
          return;
        }
        setLat(latitude);
        setLong(longitude);
      },(err) => {},{enableHighAccuracy: true});
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function syncLocation() {
    setInterval(() => {
      getLocation();
    }, 10000);
  }

  useEffect(() => {
    if (initialized.current && travelData != null) {
      DriverRepository.saveTravelData({...travelData, lat, long});
    } else {
      initialized.current = true;
    }
  }, [travelData,lat,long]);

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
    sendFcm("Bus stopped", `Bus reached at ${stopData.stop}`,stopData.stop);
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
    
      await DriverRepository.getAllStudents(route)
      .then((res) => {
        console.log(res);
        setStudents(res);
      })
      .catch((err) => {
        alert(err);
      });
      
    setIsLoading(false);
  }


  async function sendFcm(title, body,stop) {
    DriverRepository.getAllParents(route,stop).then((userList) => {
      console.log(userList);
      userList.forEach((user) => {
        console.log(user.token);
        DriverRepository.sendFcmNotification(user.token,title??'', body??'');
      });
    }).catch((err) => {
      console.log(err);
    })
  }


  function handleOk() {
    takeAttendance();
    setModalOpen(false);
  }
  function handleCancel() {
    setModalOpen(false);
  }




  useEffect(() => {
    fetchData();
    syncLocation();
  }, []);

  return {
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
  };
}

export default useDriverRouteController;
