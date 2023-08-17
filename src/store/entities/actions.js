import {
  GET_STORES,
  GET_STORES_SUCCESS,
  GET_STORES_FAIL,
  GET_STORE_PROFILE,
  GET_STORE_PROFILE_SUCCESS,
  GET_STORE_PROFILE_FAIL,
  ADD_NEW_STORE,
  ADD_STORE_SUCCESS,
  ADD_STORE_FAIL,
  UPDATE_STORE,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  DELETE_STORE,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
} from "./actionTypes";

export const getStores = () => ({
  type: GET_STORES,
});

export const getStoresSuccess = (stores) => ({
  type: GET_STORES_SUCCESS,
  payload: stores,
});

export const getStoresFail = (error) => ({
  type: GET_STORES_FAIL,
  payload: error,
});

export const addNewStore = (store) => ({
  type: ADD_NEW_STORE,
  payload: store,
});

export const addStoreSuccess = (store) => ({
  type: ADD_STORE_SUCCESS,
  payload: store,
});

export const addStoreFail = (error) => ({
  type: ADD_STORE_FAIL,
  payload: error,
});

export const getStoreProfile = () => ({
  type: GET_STORE_PROFILE,
});

export const getStoreProfileSuccess = (storeProfile) => ({
  type: GET_STORE_PROFILE_SUCCESS,
  payload: storeProfile,
});

export const getStoreProfileFail = (error) => ({
  type: GET_STORE_PROFILE_FAIL,
  payload: error,
});

export const updateStore = (store) => ({
  type: UPDATE_STORE,
  payload: store,
});

export const updateStoreSuccess = (store) => ({
  type: UPDATE_STORE_SUCCESS,
  payload: store,
});

export const updateStoreFail = (error) => ({
  type: UPDATE_STORE_FAIL,
  payload: error,
});

export const deleteStore = (store) => ({
  type: DELETE_STORE,
  payload: store,
});

export const deleteStoreSuccess = (store) => ({
  type: DELETE_STORE_SUCCESS,
  payload: store,
});

export const deleteStoreFail = (error) => ({
  type: DELETE_STORE_FAIL,
  payload: error,
});
