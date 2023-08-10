import { combineReducers } from "redux";

import Layout from "./layout/reducer";
import Login from "./auth/login/reducer";
import Dashboard from "./dashboard/reducer";
import Account from "./settings/admins/reducer";
import Stores from "./entities/reducer";

const rootReducer = combineReducers({
  Layout,
  Login,
  Dashboard,
  Account,
  Stores,
});

export default rootReducer;
