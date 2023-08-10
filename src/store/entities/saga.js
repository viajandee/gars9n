import { call, put, takeEvery } from "redux-saga/effects";

import { GET_STORES } from "./actionTypes";

import { getStoresSuccess, getStoresFail } from "./actions";

import { getStores } from "../../helpers/fakebackend_helper";

function* fetchStores() {
  try {
    const response = yield call(getStores);
    yield put(getStoresSuccess(response));
  } catch (error) {
    yield put(getStoresFail(error));
  }
}

function* entitiesSaga() {
  yield takeEvery(GET_STORES, fetchStores);
}

export default entitiesSaga;
