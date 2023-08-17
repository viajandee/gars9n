import {
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  GET_CLIENT_PROFILE_SUCCESS,
  GET_CLIENT_PROFILE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  clients: [],
  clientProfile: {},
  error: {},
};

const clients = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload,
      };

    case GET_CLIENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case ADD_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        clientProfile: action.payload,
      };

    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id.toString() === action.payload.id.toString()
            ? { client, ...action.payload }
            : client
        ),
      };

    case UPDATE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CLIENT_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default clients;
