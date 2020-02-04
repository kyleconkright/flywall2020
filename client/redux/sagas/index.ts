/* global fetch */

import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  actionTypes,
  loadMembersSuccess,
  failure,
  loadMembersClientSuccess
} from "../actions";

function* loadDataSaga(action?: {
  payload: { chamber: any; chamberNumber: any };
}) {
  const { chamber, chamberNumber } = action.payload;

  try {
    const res: any = yield axios.get(formatMemberUrl(chamber, chamberNumber));
    // // W000817 warren
    // // S000033 sanders
    // axios.get(formatMemberCompare("W000817", "S000033", "senate", 116));

    const members = res.data.data[0].members;

    yield put(loadMembersSuccess(members));
  } catch (err) {
    yield put(failure(err));
  }
}
function* loadMembersClientSaga(action?: {
  payload: { chamber: any; chamberNumber: any };
}) {
  const { chamber, chamberNumber } = action.payload;

  try {
    const res: any = yield axios.get(formatMemberUrl(chamber, chamberNumber));

    const members = res.data.data[0].members;

    yield put(loadMembersClientSuccess(members));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_MEMBERS, loadDataSaga),
    takeLatest(actionTypes.LOAD_MEMBERS_CLIENT, loadMembersClientSaga)
  ]);
}

export default rootSaga;

// helpers TODO: Move to helpers folder
export type ChamberOptions = "house" | "senate" | "both";
export type ChamberNumber = number;

function formatMemberUrl(chamber: ChamberOptions, chamberNumber: number) {
  return `http://localhost:2020/api/members/${chamber}/${chamberNumber}`;
}
function formatMemberCompare(
  member1: string,
  member2: string,
  chamber: ChamberOptions,
  chamberNumber: number
) {
  return `http://localhost:2020/api/members/${member1}/${member2}/${chamber}/${chamberNumber}`;
}
