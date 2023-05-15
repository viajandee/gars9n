import {
  API_SUCCESS,
  API_FAIL
} from "./actionTypes";

export const DashboardSaasapiSuccess = (actionType, data) => ({
    type: API_SUCCESS,
    payload: { actionType, data },
});

export const DashboardSaasapiFail = (actionType, error) => ({
    type: API_FAIL,
    payload: { actionType, error },
});