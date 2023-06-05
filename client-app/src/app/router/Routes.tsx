import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/Form/ActivityForm";
import ActivityDetails from "../../features/activities/Details/ActivityDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "createActivity", element: <ActivityForm key='create'/> },
      { path: "manage/:id", element: <ActivityForm key='manage'/> },
    ],
  },
];

export const router = createBrowserRouter(routes);
