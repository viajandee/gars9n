import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_CLIENTS,
  GET_CLIENT_PROFILE,
  ADD_NEW_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
} from "./actionTypes";

import {
  getClientsSuccess,
  getClientsFail,
  getClientProfileSuccess,
  getClientProfileFail,
  addClientFail,
  addClientSuccess,
  updateClientSuccess,
  updateClientFail,
  deleteClientSuccess,
  deleteClientFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getClients,
  getClientProfile,
  addNewClient,
  updateClient,
  deleteClient,
} from "../../helpers/fakebackend_helper";

function* fetchClients() {
  try {
    const response = yield call(getClients);
    yield put(getClientsSuccess(response));
  } catch (error) {
    yield put(getClientsFail(error));
  }
}

function* fetchClientProfile() {
  try {
    const response = yield call(getClientProfile);
    yield put(getClientProfileSuccess(response));
  } catch (error) {
    yield put(getClientProfileFail(error));
  }
}

function* onUpdateClient({ payload: client }) {
  try {
    const response = yield call(updateClient, client);
    yield put(updateClientSuccess(response));
  } catch (error) {
    yield put(updateClientFail(error));
  }
}

function* onDeleteClient({ payload: client }) {
  try {
    const response = yield call(deleteClient, client);
    yield put(deleteClientSuccess(response));
  } catch (error) {
    yield put(deleteClientFail(error));
  }
}

function* onAddNewClient({ payload: client }) {
  try {
    const response = yield call(addNewClient, client);

    yield put(addClientSuccess(response));
  } catch (error) {
    yield put(addClientFail(error));
  }
}

function* clientSaga() {
  yield takeEvery(GET_CLIENTS, fetchClients);
  yield takeEvery(GET_CLIENT_PROFILE, fetchClientProfile);
  yield takeEvery(ADD_NEW_CLIENT, onAddNewClient);
  yield takeEvery(UPDATE_CLIENT, onUpdateClient);
  yield takeEvery(DELETE_CLIENT, onDeleteClient);
}

export default clientSaga;
