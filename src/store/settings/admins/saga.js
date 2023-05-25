import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { REGISTER_ADMIN } from "./actionTypes";
import { registerAdminSuccessful, registerAdminFailed } from "./actions";

import { getFirebaseBackend } from "../../../helpers/firebase_helper";

const firebaseBackend = getFirebaseBackend()

function* registerAdmin({ payload: { admin } }) {
  console.log("using the following url for registration: ")
  try {
    console.log("Trying to register user (within try block)")
    const response = yield call(
      firebaseBackend.registerAdmin,
      admin.email,
      admin.password,
      admin.firstName,
      admin.lastName,
      admin.title,
      admin.company,
      admin.phone
    )
    yield put(registerAdminSuccessful(response))
  } catch (error) {
    console.log("There was an error registering: ", error)
    yield put(registerAdminFailed(error))
  }
}

export function* watchAdminRegister() {
  yield takeEvery(REGISTER_ADMIN, registerAdmin)
}

function* accountSaga() {
  yield all([fork(watchAdminRegister)])
}

export default accountSaga