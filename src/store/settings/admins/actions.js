import { 
  REGISTER_ADMIN,
  REGISTER_ADMIN_SUCCESSFUL,
  REGISTER_ADMIN_FAILED
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