export const actionTypes = {
  FAILURE: "FAILURE",
  LOAD_MEMBERS: "LOAD_MEMBERS",
  LOAD_MEMBERS_CLIENT: "LOAD_MEMBERS_CLIENT",
  LOAD_MEMBERS_CLIENT_SUCCESS: "LOAD_MEMBERS_CLIENT_SUCCESS",
  LOAD_MEMBERS_SUCCESS: "LOAD_MEMBERS_SUCCESS"
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  };
}

export function loadMembers() {
  return { type: actionTypes.LOAD_MEMBERS };
}
export function loadMembersSuccess(members: any[]) {
  return { type: actionTypes.LOAD_MEMBERS_SUCCESS, payload: { members } };
}
export function loadMembersClient() {
  return { type: actionTypes.LOAD_MEMBERS_CLIENT };
}

export function loadMembersClientSuccess(members: any[]) {
  return {
    type: actionTypes.LOAD_MEMBERS_CLIENT_SUCCESS,
    payload: { members }
  };
}
