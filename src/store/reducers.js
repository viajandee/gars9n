import { combineReducers } from "redux";

import Layout from "./layout/reducer";
import Login from "./auth/login/reducer";
import Dashboard from "./dashboard/reducer";
import Account from "./settings/admins/reducer";
import entities from "./entities/reducer";
import client from "./client/reducer";

const rootReducer = combineReducers({
  Layout,
  Login,
  Dashboard,
  Account,
  entities,
  client,
});

export default rootReducer;
