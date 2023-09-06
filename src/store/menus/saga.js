import { call, put, takeEvery } from "redux-saga/effects";

// MENUS Redux States
import {
  GET_CART_DATA,
  GET_CUSTOMERS,
  GET_ORDERS,
  GET_MENUS_DETAIL,
  GET_MENUS,
  GET_SHOPS,
  ADD_NEW_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_MENU_COMMENTS,
  ON_LIKE_COMMENT,
  ON_LIKE_REPLY,
  ON_ADD_REPLY,
  ON_ADD_COMMENT,
} from "./actionTypes";
import {
  getCartDataFail,
  getCartDataSuccess,
  getCustomersFail,
  getCustomersSuccess,
  getOrdersFail,
  getOrdersSuccess,
  getMenuDetailFail,
  getMenuDetailSuccess,
  getMenusFail,
  getMenusSuccess,
  getShopsFail,
  getShopsSuccess,
  addOrderFail,
  addOrderSuccess,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
  addCustomerFail,
  addCustomerSuccess,
  updateCustomerSuccess,
  updateCustomerFail,
  deleteCustomerSuccess,
  deleteCustomerFail,
  getMenuCommentsSuccess,
  getMenuCommentsFail,
  onLikeCommentSuccess,
  onLikeCommentFail,
  onLikeReplySuccess,
  onLikeReplyFail,
  onAddReplySuccess,
  onAddReplyFail,
  onAddCommentSuccess,
  onAddCommentFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCartData,
  getCustomers,
  getOrders,
  getMenus,
  getShops,
  getMenuDetail,
  addNewOrder,
  updateOrder,
  deleteOrder,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getMenuComents as getMenuComentsApi,
  onLikeComment as onLikeCommentApi,
  onLikeReply as onLikeReplyApi,
  onAddReply as onAddReplyApi,
  onAddComment as onAddCommentApi,
} from "../../helpers/fakebackend_helper";

function* fetchMenus() {
  try {
    const response = yield call(getMenus);
    yield put(getMenusSuccess(response));
  } catch (error) {
    yield put(getMenusFail(error));
  }
}

function* fetchMenuDetail({ menuId }) {
  try {
    const response = yield call(getMenuDetail, menuId);
    yield put(getMenuDetailSuccess(response));
  } catch (error) {
    yield put(getMenuDetailFail(error));
  }
}

function* fetchOrders() {
  try {
    const response = yield call(getOrders);
    yield put(getOrdersSuccess(response));
  } catch (error) {
    yield put(getOrdersFail(error));
  }
}

function* fetchCartData() {
  try {
    const response = yield call(getCartData);
    yield put(getCartDataSuccess(response));
  } catch (error) {
    yield put(getCartDataFail(error));
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers);
    yield put(getCustomersSuccess(response));
  } catch (error) {
    yield put(getCustomersFail(error));
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer);
    yield put(updateCustomerSuccess(response));
  } catch (error) {
    yield put(updateCustomerFail(error));
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomer, customer);
    yield put(deleteCustomerSuccess(response));
  } catch (error) {
    yield put(deleteCustomerFail(error));
  }
}

function* onAddNewCustomer({ payload: customer }) {
  try {
    const response = yield call(addNewCustomer, customer);

    yield put(addCustomerSuccess(response));
  } catch (error) {
    yield put(addCustomerFail(error));
  }
}

function* fetchShops() {
  try {
    const response = yield call(getShops);
    yield put(getShopsSuccess(response));
  } catch (error) {
    yield put(getShopsFail(error));
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response));
  } catch (error) {
    yield put(updateOrderFail(error));
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order);
    console.log("response", response);
    yield put(deleteOrderSuccess(response));
  } catch (error) {
    console.log("error", error);
    yield put(deleteOrderFail(error));
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order);
    yield put(addOrderSuccess(response));
  } catch (error) {
    yield put(addOrderFail(error));
  }
}

function* getMenuComents() {
  try {
    // todo - add Menu Id to the payload and api
    const response = yield call(getMenuComentsApi);
    yield put(getMenuCommentsSuccess(response));
  } catch (error) {
    yield put(getMenuCommentsFail(error));
  }
}

function* onLikeComment({ payload: { commentId, menuId } }) {
  try {
    // todo - add Menu Id to the payload and api
    const response = yield call(onLikeCommentApi, commentId, menuId);
    yield put(onLikeCommentSuccess(response));
  } catch (error) {
    yield put(onLikeCommentFail(error));
  }
}

function* onLikeReply({ payload: { commentId, menuId, replyId } }) {
  try {
    // todo - add menu Id to the payload and api
    const response = yield call(onLikeReplyApi, commentId, menuId, replyId);
    yield put(onLikeReplySuccess(response));
  } catch (error) {
    yield put(onLikeReplyFail(error));
  }
}

function* onAddReply({ payload: { commentId, menuId, replyText } }) {
  try {
    const response = yield call(onAddReplyApi, commentId, menuId, replyText);
    yield put(onAddReplySuccess(response));
  } catch (error) {
    yield put(onAddReplyFail(error));
  }
}

function* onAddComment({ payload: { menuId, commentText } }) {
  try {
    const response = yield call(onAddCommentApi, menuId, commentText);
    yield put(onAddCommentSuccess(response));
  } catch (error) {
    yield put(onAddCommentFail(error));
  }
}

function* menusSaga() {
  yield takeEvery(GET_MENUS, fetchMenus);
  yield takeEvery(GET_MENUS_DETAIL, fetchMenuDetail);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(GET_CART_DATA, fetchCartData);
  yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer);
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
  yield takeEvery(GET_SHOPS, fetchShops);
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
  yield takeEvery(GET_MENU_COMMENTS, getMenuComents);
  yield takeEvery(ON_LIKE_COMMENT, onLikeComment);
  yield takeEvery(ON_LIKE_REPLY, onLikeReply);
  yield takeEvery(ON_ADD_REPLY, onAddReply);
  yield takeEvery(ON_ADD_COMMENT, onAddComment);
}

export default menusSaga;
