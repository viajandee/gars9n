import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_STORES,
  GET_STORE_PROFILE,
  ADD_NEW_STORE,
  DELETE_STORE,
  UPDATE_STORE,
} from "./actionTypes";

import {
  getStoresSuccess,
  getStoresFail,
  getStoreProfileSuccess,
  getStoreProfileFail,
  addStoreFail,
  addStoreSuccess,
  updateStoreSuccess,
  updateStoreFail,
  deleteStoreSuccess,
  deleteStoreFail,
} from "./actions";

import {
  getStores,
  getStoreProfile,
  addNewStore,
  updateStore,
  deleteStore,
} from "../../helpers/fakebackend_helper";

function* fetchStores() {
  try {
    const response = yield call(getStores);
    yield put(getStoresSuccess(response));
  } catch (error) {
    yield put(getStoresFail(error));
  }
}

function* fetchStoreProfile() {
  try {
    const response = yield call(getStoreProfile);
    yield put(getStoreProfileSuccess(response));
  } catch (error) {
    yield put(getStoreProfileFail(error));
  }
}

function* onUpdateStore({ payload: store }) {
  try {
    const response = yield call(updateStore, store);
    yield put(updateStoreSuccess(response));
  } catch (error) {
    yield put(updateStoreFail(error));
  }
}

function* onDeleteStore({ payload: store }) {
  try {
    const response = yield call(deleteStore, store);
    yield put(deleteStoreSuccess(response));
  } catch (error) {
    yield put(deleteStoreFail(error));
  }
}

function* onAddNewStore({ payload: store }) {
  try {
    const response = yield call(addNewStore, store);

    yield put(addStoreSuccess(response));
  } catch (error) {
    yield put(addStoreFail(error));
  }
}

function* entitiesSaga() {
  yield takeEvery(GET_STORES, fetchStores);
  yield takeEvery(GET_STORE_PROFILE, fetchStoreProfile);
  yield takeEvery(ADD_NEW_STORE, onAddNewStore);
  yield takeEvery(UPDATE_STORE, onUpdateStore);
  yield takeEvery(DELETE_STORE, onDeleteStore);
}

export default entitiesSaga;
