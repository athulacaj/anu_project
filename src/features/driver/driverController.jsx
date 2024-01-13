import { useContext, useEffect } from "react";
import UserContext from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import {
  getFcmToken,
  requestFcmPermission,
} from "../../common/functions/firebase";
import DriverRepository from "./driverRepository";

function useDriverController() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userData", userData);
  }, []);

  const onCardClick = (route) => () => {
    navigate(`/driver/${route}`);
  };

  function allowNotification() {
    requestFcmPermission().then(() => {
      console.log("permission granted");
      getFcmToken().then((token) => {
        DriverRepository.updateToken(userData.email, token)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(token);
      });
    });
  }

  function sendNotificationToAdmin() {
    const message = prompt("Enter message");
    // if pressed ok
    if (message) {
      DriverRepository.getAllAdmin().then((res) => {
        console.log(res);
        res.forEach((admin) => {
          console.log(admin.token);
          DriverRepository.sendFcmNotification(
            admin.token,
            "Message from driver",
            message
          );
        });
      });
    }
  }

  return { userData, onCardClick, allowNotification, sendNotificationToAdmin };
}

export default useDriverController;
