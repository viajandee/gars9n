import { Redirect } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

import Dashboard from "../pages/Dashboard/index";
import UserCreate from "pages/Users/users-create";
import UserAdmin from "pages/Settings/admins-create";
import Pages404 from "pages/Utility/pages-404";

import StoresGrid from "components/Stores/StoresGrid";
import ClientsList from "components/Client/ClientsList";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/", exact: true, component: () => <Redirect to='/dashboard' /> },
  { path: "/add-user", component: UserCreate },
  { path: "/add-admin", component: UserAdmin },
  { path: "/stores-grid", component: StoresGrid },
  { path: "/clients-list", component: ClientsList },
  { component: Pages404 },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
];

export { authProtectedRoutes, publicRoutes };
