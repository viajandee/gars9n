import {
  API_SUCCESS,
  API_FAIL
} from "./actionTypes";

const INIT_STATE = {
  sellingData: [],
  earningChartData: []
};

const DashboardSaas = (state = INIT_STATE, action) => {
  switch (action.type) {
      case API_SUCCESS:
          switch (action.payload.actionType) {
              default:
                  return state;
          }
      case API_FAIL:
          switch (action.payload.actionType) {
              default:
                  return state;
          }
      default:
          return state;
  }
}


export default DashboardSaas;