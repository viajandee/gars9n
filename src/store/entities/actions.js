import {
    GET_STORES,
    GET_STORES_SUCCESS,
    GET_STORES_FAIL
} from "./actionTypes"

export const getStores = () => ({
    type: GET_STORES,
})

export const getStoresSuccess = stores => ({
    type: GET_STORES_SUCCESS,
    payload: stores,
})

export const getStoresFail = error => ({
    type: GET_STORES_FAIL,
    payload: error,
})