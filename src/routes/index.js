import { Redirect } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

import Dashboard from "../pages/Dashboard/index";
import UserCreate from "pages/Users/users-create";
import UserAdmin from "pages/Settings/admins-create";
import Pages404 from "pages/Utility/pages-404";
// STORES
import StoresGrid from "components/Stores/StoresGrid";
// CLIENTS
import ClientsList from "components/Client/ClientsList";
// MENUS
import MenuFoodList from "../components/Menus/MenuFoodList/index";
import FoodListDetail from "../components/Menus/MenuFoodList/FoodListDetail";
import MenuAddFoods from "../components/Menus/AddFood";
// EMAILS
import EmailInbox from "../components/Emails/email-inbox";
import EmailRead from "../components/Emails/email-read";
import EmailBasicTemplete from "../components/Emails/email-basic-template";
import EmailAlertTemplete from "../components/Emails/email-template-alert";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/", exact: true, component: () => <Redirect to='/dashboard' /> },
  { path: "/add-user", component: UserCreate },
  { path: "/add-admin", component: UserAdmin },
  // STORES
  { path: "/stores-grid", component: StoresGrid },
  // CLIENTS
  { path: "/clients-list", component: ClientsList },
  // MENUS
  { path: "/menu-food-list", component: MenuFoodList },
  { path: "/menu-food-detail/:id", component: FoodListDetail },
  { path: "/menu-add-food", component: MenuAddFoods },
  // EMAILS
  { path: "/email-inbox", component: EmailInbox },
  { path: "/email-read", component: EmailRead },
  { path: "/email-template-basic", component: EmailBasicTemplete },
  { path: "/email-template-alert", component: EmailAlertTemplete },
  { component: Pages404 },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
];

export { authProtectedRoutes, publicRoutes };
