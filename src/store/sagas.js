import { all, fork } from "redux-saga/effects"

import AuthSaga from "./auth/login/saga"
import AccountSaga from "./settings/admins/saga"
import LayoutSaga from "./layout/saga"
import dashboardSaga from "./dashboard/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(AccountSaga),
    fork(LayoutSaga),
    fork(dashboardSaga)
  ])
}