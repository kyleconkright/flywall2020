import { ChamberOptions, ChamberNumber } from "../sagas";

export const actionTypes = {
  FAILURE: "FAILURE",
  GET_COMPARE_DATA: "GET_COMPARE_DATA",
  COMPARE_DATA_SUCCESS: "COMPARE_DATA_SUCCESS",
  UPDATE_CHAMBER: "UPDATE_CHAMBER",
  UPDATE_CHAMBER_NUMBER: "UPDATE_CHAMBER_NUMBER",
  LOAD_MEMBERS: "[MEMBERS] Load Members",
  LOAD_MEMBERS_SUCCESS: "[MEMBERS] Load Members Success"
};

export function failure(error) {
  console.error("error >> ", error);
  return {
    type: actionTypes.FAILURE,
    error
  };
}

export function loadMembers(
  chamber: ChamberOptions,
  chamberNumber: ChamberNumber
) {
  return {
    type: actionTypes.LOAD_MEMBERS,
    payload: { chamber, chamberNumber }
  };
}

export function loadMembersSuccess(members: any[], chamber) {
  return { type: actionTypes.LOAD_MEMBERS_SUCCESS, payload: { members, chamber } };
}

export function updateChamber(chamber: ChamberOptions) {
  return {
    type: actionTypes.UPDATE_CHAMBER,
    payload: { chamber }
  };
}
export function updateChamberNumber(chamberNumber: ChamberNumber) {
  return {
    type: actionTypes.UPDATE_CHAMBER_NUMBER,
    payload: { chamberNumber }
  };
}

export function getCompareData(
  member1: string,
  member2: string,
  chamberNumber: ChamberNumber,
  chamber: ChamberOptions
) {
  return {
    type: actionTypes.GET_COMPARE_DATA,
    payload: { chamberNumber, chamber, member1, member2 }
  };
}
export function compareSuccessData(compareInfo: any) {
  return {
    type: actionTypes.COMPARE_DATA_SUCCESS,
    payload: { compareInfo }
  };
}
