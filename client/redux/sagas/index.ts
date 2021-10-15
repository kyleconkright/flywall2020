/* global fetch */

import { all, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  actionTypes,
  loadMembersSuccess,
  failure,
  loadMembersClientSuccess,
  compareSuccessData,
  loadFullCongressSuccess,
  searchBillsSuccess,
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

function* loadFullCongressSaga(action?: { payload: { congressNumber: any } }) {
  const { congressNumber } = action.payload;

  try {
    const houseRes: any = yield axios.get(
      formatMemberUrl("house", congressNumber)
    );
    const senateRes: any = yield axios.get(
      formatMemberUrl("senate", congressNumber)
    );
    const house = houseRes.data.data[0].members;
    const senate = senateRes.data.data[0].members;

    yield put(loadFullCongressSuccess({ house, senate }));
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
function* searchBillsSaga(action?: { payload: { query: string } }) {
  const { query } = action.payload;

  try {
    const res: any = yield axios.post(
      `http://localhost:2020/api/bills/search`,
      {
        query
      }
    );

    const bills = res.data.data[0].bills;
    // console.log("bills.uqery", bills, query);
    yield put(searchBillsSuccess(bills, query));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_MEMBERS, loadDataSaga),
    takeLatest(actionTypes.LOAD_MEMBERS_CLIENT, loadMembersClientSaga),
    takeLatest(actionTypes.GET_COMPARE_DATA, compareMembersSaga),
    takeLatest(actionTypes.LOAD_FULL_CONGRESS, loadFullCongressSaga),
    takeLatest(actionTypes.SEARCH_BILLS, searchBillsSaga)
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
