import { ChamberOptions, ChamberNumber } from "../sagas";

export const actionTypes = {
  FAILURE: "FAILURE",
  GET_COMPARE_DATA: "GET_COMPARE_DATA",
  COMPARE_DATA_SUCCESS: "COMPARE_DATA_SUCCESS",
  UPDATE_CHAMBER: "UPDATE_CHAMBER",
  UPDATE_CHAMBER_NUMBER: "UPDATE_CHAMBER_NUMBER",
  LOAD_MEMBERS: "LOAD_MEMBERS",
  LOAD_MEMBERS_CLIENT: "LOAD_MEMBERS_CLIENT",
  LOAD_MEMBERS_CLIENT_SUCCESS: "LOAD_MEMBERS_CLIENT_SUCCESS",
  LOAD_MEMBERS_SUCCESS: "LOAD_MEMBERS_SUCCESS",
  LOAD_FULL_CONGRESS: "LOAD_FULL_CONGRESS",
  LOAD_FULL_CONGRESS_SUCCESS: "LOAD_FULL_CONGRESS_SUCCESS"
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

export function loadMembersSuccess(members: any[]) {
  return { type: actionTypes.LOAD_MEMBERS_SUCCESS, payload: { members } };
}

export function loadMembersClient(
  chamber: ChamberOptions,
  chamberNumber: ChamberNumber
) {
  return {
    type: actionTypes.LOAD_MEMBERS_CLIENT,
    payload: { chamber, chamberNumber }
  };
}

export function loadMembersClientSuccess(members: any[] = []) {
  return {
    type: actionTypes.LOAD_MEMBERS_CLIENT_SUCCESS,
    payload: { members }
  };
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

export function loadFullCongressSuccess(fullCongress: {
  house: any[];
  senate: any[];
}) {
  return {
    type: actionTypes.LOAD_FULL_CONGRESS_SUCCESS,
    payload: { ...fullCongress }
  };
}
export function loadFullCongress(congressNumber: number) {
  return {
    type: actionTypes.LOAD_FULL_CONGRESS,
    payload: { congressNumber }
  };
}
