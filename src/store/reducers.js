import { combineReducers } from "redux";

import Layout from "./layout/reducer";
import Login from "./auth/login/reducer";
import Dashboard from "./dashboard/reducer";

const rootReducer = combineReducers({
  Layout,
  Login,
  Dashboard
})

export default rootReducer