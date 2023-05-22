import { 
  REGISTER_ADMIN,
  REGISTER_ADMIN_SUCCESSFUL,
  REGISTER_ADMIN_FAILED,
  ADD_DETAILS_TO_FIRESTORE
} from "./actionTypes";

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  admin: null,
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ADMIN:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      }
      break
    case REGISTER_ADMIN_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        admin: action.payload,
        registrationError: null,
      }
      break
    case REGISTER_ADMIN_FAILED:
      state = {
        ...state,
        admin: null,
        loading: false,
        registrationError: action.payload,
      }
      break
    case ADD_DETAILS_TO_FIRESTORE:
      state = {
        ...state,
        admin: action.payload,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default account