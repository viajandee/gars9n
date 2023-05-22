import { 
  REGISTER_ADMIN,
  REGISTER_ADMIN_SUCCESSFUL,
  REGISTER_ADMIN_FAILED,
  ADD_DETAILS_TO_FIRESTORE
} from "./actionTypes";

export const registerAdmin = admin => {
  return {
    type: REGISTER_ADMIN,
    payload: { admin },
  }
}

export const registerAdminSuccessful = admin => {
  return {
    type: REGISTER_ADMIN_SUCCESSFUL,
    payload: admin,
  }
}

export const registerAdminFailed = error => {
  return {
    type: REGISTER_ADMIN_FAILED,
    payload: error,
  }
}

export const addDetailsToFirestore = admin => {
  return {
    type: ADD_DETAILS_TO_FIRESTORE,
    payload: admin,
  }
}