import { ChamberOptions, ChamberNumber } from "../sagas";

export const actionTypes = {
  FAILURE: "FAILURE",
  UPDATE_CHAMBER: "UPDATE_CHAMBER",
  UPDATE_CHAMBER_NUMBER: "UPDATE_CHAMBER_NUMBER",
  LOAD_MEMBERS: "LOAD_MEMBERS",
  LOAD_MEMBERS_CLIENT: "LOAD_MEMBERS_CLIENT",
  LOAD_MEMBERS_CLIENT_SUCCESS: "LOAD_MEMBERS_CLIENT_SUCCESS",
  LOAD_MEMBERS_SUCCESS: "LOAD_MEMBERS_SUCCESS"
};

export function failure(error) {
  console.error("error >> ", error);
  return {
    type: actionTypes.FAILURE,
    error
  };
}

export function loadMembers(chamber: ChamberOptions, chamberNumber: ChamberNumber) {
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
