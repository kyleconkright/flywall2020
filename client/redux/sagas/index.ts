/* global fetch */

import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
// import es6promise from "es6-promise";
// import "isomorphic-unfetch";
import axios from "axios";
import { actionTypes, loadMembersSuccess, failure } from "../actions";

// es6promise.polyfill();

function* loadDataSaga() {
  try {
    const res: any = yield axios.get("http://localhost:2020/api/members");
    const members = res.data.data[0].members;
    yield put(loadMembersSuccess(members));
  } catch (err) {
    console.info("error", err);
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([takeLatest(actionTypes.LOAD_MEMBERS, loadDataSaga)]);
}

export default rootSaga;
