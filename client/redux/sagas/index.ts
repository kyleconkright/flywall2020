/* global fetch */

import { all, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  actionTypes,
  loadMembersSuccess,
  failure,
  compareSuccessData,
  updateChamber
} from "../actions";

function* loadDataSaga(action?: {
  payload: { chamber: any; chamberNumber: any };
}) {
  const { chamber, chamberNumber } = action.payload;

  try {
    const res: any = yield axios.get(formatMemberUrl(chamber, chamberNumber));

    const members = res.data.data[0].members;

    yield put(loadMembersSuccess(members, chamber));
    yield put(updateChamber(chamber));
  } catch (err) {
    yield put(failure(err));
  }
}

function* compareMembersSaga(action?: { payload: any }) {
  const { chamber, chamberNumber, member1, member2 } = action.payload;

  try {
    const res: any = yield axios.get(
      formatMemberCompare(member1, member2, chamber, chamberNumber)
    );

    const compareInfo = res.data.data;

    yield put(compareSuccessData(compareInfo));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_MEMBERS, loadDataSaga),
    takeLatest(actionTypes.GET_COMPARE_DATA, compareMembersSaga)
  ]);
}

export default rootSaga;

// helpers TODO: Move to helpers folder
export type ChamberOptions = "house" | "senate" | "both";
export type ChamberNumber = number;

function formatMemberUrl(chamber: ChamberOptions, chamberNumber: number) {
  return `${process.env.API_URL}/members/${chamber}/${chamberNumber}`;
}
function formatMemberCompare(
  member1: string,
  member2: string,
  chamber: ChamberOptions,
  chamberNumber: number
) {
  return `${process.env.API_URL}/compare/${member1}/${member2}/${chamber}/${chamberNumber}`;
}
