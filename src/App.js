import { useEffect, useState } from 'react';
import LocalizeContext from './contexts/loacalizeContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import UserContext from './contexts/userContext';



function App() {
  const langState=useState('en');
  const [lang, setLang] = useState('Initial Value');
  const [userData, setUserData] = useState();

  useEffect(() => {
    // i18next.changeLanguage('ml');
  }, [lang]);
  

  return (
    // add a provider for i18n
    <UserContext.Provider value={{userData,setUserData}}>
    <LocalizeContext.Provider value={langState} >
    <div >
      {/* <Login/> */}
      <RouterProvider router={router} />
      </div>
      </LocalizeContext.Provider>
      </UserContext.Provider>
  );
}
export default App;
