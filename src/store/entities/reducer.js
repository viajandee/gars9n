import {
    GET_STORES_SUCCESS,
    GET_STORES_FAIL
} from "./actionTypes"

const INIT_STATE = {
    stores: [],
    error: {},
}

const entities = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_STORES_SUCCESS:
            return {
                ...state,
                stores: action.payload,
            }
        case GET_STORES_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}

export default entities