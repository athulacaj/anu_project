import { createBrowserRouter } from 'react-router-dom';
import ManageParents from './features/admin/parents/manageParents';
import Login from './features/login/login';
import {OnboardingPage} from './features/onboarding/onboarding';
import ManageDrivers from './features/admin/driver/manageDriver';
import ManageRoutes from './features/admin/routes/manageRoutes';
import ManageDriverRoute from './features/driver/route/manageRoute';


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
  {
    path: "*",
    element: <div>Not Found</div>,
  },
  {
    path: "manage-drivers",
    element: <ManageDrivers />
  },
  {
    path: "manage-routes",
    element:<ManageRoutes />
  },
  {
    path:"driver/:route",
    element:<ManageDriverRoute/>
  }
]);

export default router;
