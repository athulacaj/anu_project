import { useContext, useEffect, useState } from 'react';
import Login from './components/login/login';
import LocalizeContext from './contexts/loacalizeContext';
import i18n from './i18n'; // Import your i18n configuration

import { Button } from 'antd';
import i18next from './i18n';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import OnBoardingPage from './components/onboarding/onboarding';


const router = createBrowserRouter([
  {
    path: "/",
    element: <OnBoardingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const langState=useState('en');
  const [lang, setLang] = useState('Initial Value');
  
  useEffect(() => {
    // i18next.changeLanguage('ml');
  }, [lang]);

  return (
    // add a provider for i18n
    <LocalizeContext.Provider value={langState} >
    <div >
      {/* <Login/> */}
      <RouterProvider router={router} />
      </div>
      </LocalizeContext.Provider>
  );
}
export default App;
