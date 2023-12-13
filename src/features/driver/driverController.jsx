import { useContext, useEffect } from "react";
import UserContext from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

function useDriverController() {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("userData", userData);
    }, []);


    const onCardClick = (route) => () => {
        navigate(`/driver/${route}`);
    };
  return {userData,onCardClick};
}

export default useDriverController;