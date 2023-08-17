import {
  GET_STORES_SUCCESS,
  GET_STORES_FAIL,
  ADD_STORE_SUCCESS,
  ADD_STORE_FAIL,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  GET_STORE_PROFILE_SUCCESS,
  GET_STORE_PROFILE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  stores: [],
  error: {},
};

const entities = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STORES_SUCCESS:
      return {
        ...state,
        stores: action.payload,
      };
    case GET_STORES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_STORE_SUCCESS:
      return {
        ...state,
        stores: [...state.stores, action.payload],
      };

    case ADD_STORE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_STORE_PROFILE_SUCCESS:
      return {
        ...state,
        storeProfile: action.payload,
      };

    case UPDATE_STORE_SUCCESS:
      return {
        ...state,
        stores: state.stores.map((store) =>
          store.id.toString() === action.payload.id.toString()
            ? { store, ...action.payload }
            : store
        ),
      };

    case UPDATE_STORE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_STORE_SUCCESS:
      return {
        ...state,
        stores: state.stores.filter(
          (store) => store.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_STORE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_STORE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default entities;
