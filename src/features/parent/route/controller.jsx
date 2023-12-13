import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ParentRepository from "../oparentRepository";
import { serverTimestamp } from "firebase/firestore";
import UserContext from "../../../contexts/userContext";

function useParentRouteController() {
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState();
  const [travelData, setTravelData] = useState(null);
  const initialized = useRef(false);
  const { userData } = useContext(UserContext);
  console.log(userData);
  // const { route } = useParams();
  const route=userData?.route??null;



  async function fetchData() {
    await ParentRepository.getRouteInfo(route)
      .then((res) => {
        console.log(res);
        setRouteInfo(res);
      })
      .catch((err) => {
        alert(err);
      });
    await ParentRepository.getTravelData(route)
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
    if(route){
      fetchData();
    }
  }, []);

  return {
    routeInfo,
    isLoading,
    travelData,
  };
}

export default useParentRouteController;
