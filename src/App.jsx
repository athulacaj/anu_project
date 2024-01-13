import { useEffect, useState } from "react";
import LocalizeContext from "./contexts/loacalizeContext";
import { RouterProvider, useNavigate } from "react-router-dom";
import router from "./router";
import UserContext from "./contexts/userContext";
import { auth } from "./common/functions/firebase";
import { FullPageLoader } from "./common/components/loaders";
import OnboardRepository from "./features/onboarding/onboard_repository";
import CustomLayout from "./common/components/customLayout";
import initLocalize from "./i18n";
import i18next from "i18next";

initLocalize();

function App() {
  const [langState,setLangState] = useState(localStorage.getItem("lang")??"en");
  console.log("langState", localStorage.getItem("lang"));
  // const [lang, setLang] = useState("Initial Value");
  const [userData, setUserData] = useState();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    // setLocal storage
    localStorage.setItem("lang", langState);
    localStorage.getItem("lang");
    i18next.changeLanguage(langState);
  }, [langState]);

  const [loading, setLoading] = useState(true);
  let varUser =null;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      console.log(user);
      if (user == null) {
        setLoading(false);
        return;
      }else{
        OnboardRepository.getUserDataByEmail(user.email)
          .then((res) => {
            console.log(res);
            setUserData(res);
            setLoading(false);
            varUser = res;
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
    setTimeout(() => {
      if (varUser == null) {
        setLoading(false);
      }
    }, 4000);
  }, []);

  // if (loading) {
  //   return <FullPageLoader />;
  // }

  return (
    // add a provider for i18n
    <LocalizeContext.Provider value={{langState,setLangState}}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <CustomLayout>
          {
            loading ? (
              <FullPageLoader />
            ) : (
              <RouterProvider router={router} />
            )
          }
        </CustomLayout>
      </UserContext.Provider>
    </LocalizeContext.Provider>
  );
}
export default App;
