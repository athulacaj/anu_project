import { createBrowserRouter } from 'react-router-dom';
import ManageParents from './features/admin/parents/manageParents';
import Login from './features/login/login';
import {OnboardingPage} from './features/onboarding/onboarding';


const router = createBrowserRouter([
  {
    path: "/",
    element: <OnboardingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "manage-parents",
    element: <ManageParents />,
  },
]);

export default router;
