import { all, fork } from "redux-saga/effects";

import AuthSaga from "./auth/login/saga";
import AccountSaga from "./settings/admins/saga";
import LayoutSaga from "./layout/saga";
import dashboardSaga from "./dashboard/saga";
import entitiesSaga from "./entities/saga";
import clientSaga from "./client/saga";
import menusSaga from "./menus/saga";
import mailsSaga from "./mails/saga";

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(AccountSaga),
    fork(LayoutSaga),
    fork(dashboardSaga),
    fork(entitiesSaga),
    fork(clientSaga),
    fork(menusSaga),
    fork(mailsSaga),
  ]);
}
