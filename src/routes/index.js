import { Redirect } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

import Dashboard from "../pages/Dashboard/index";
import UserCreate from "pages/Users/users-create";
import UserAdmin from "pages/Settings/admins-create";
import Pages404 from "pages/Utility/pages-404";
// STORES
import StoresGrid from "Components/Stores/StoresGrid";
import StoreDetails from "Components/Stores/StoreDetails";
import AccountInfo from "Components/Stores/AccountInfo";
// CLIENTS
import ClientsList from "Components/Client/ClientsList";
// MENUS
import MenuList from "../Components/Menus/MenuList/AllMenus";
import Menu from "../Components/Menus/MenuList/Menu";
import AddMenu from "../Components/Menus/AddMenu";
// EMAILS
import EmailInbox from "../Components/Emails/email-inbox";
import EmailRead from "../Components/Emails/email-read";
import EmailBasicTemplete from "../Components/Emails/email-basic-template";
import EmailAlertTemplete from "../Components/Emails/email-template-alert";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/", exact: true, component: () => <Redirect to='/dashboard' /> },
  { path: "/add-user", component: UserCreate },
  { path: "/add-admin", component: UserAdmin },
  // STORES
  { path: "/stores-grid", component: StoresGrid },
  { path: "/stores-grid/store-details/:id", component: StoreDetails },
  { path: "/stores-grid/account-info/:id", component: AccountInfo },
  // CLIENTS
  { path: "/clients-list", component: ClientsList },
  // MENUS
  { path: "/all-menus", component: MenuList },
  { path: "/all-menus/menu/:id", component: Menu },
  { path: "/add-menu", component: AddMenu },
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
