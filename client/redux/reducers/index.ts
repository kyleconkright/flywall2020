import { actionTypes } from "../actions/index";
import { Task } from "redux-saga";

interface initState {
  members: any[];
  selectedMember: any;
  sagaTask: Task;
}

export const defaultState: initState = {
  members: null,
  selectedMember: null,
  sagaTask: null
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };

    case actionTypes.LOAD_MEMBERS:
      return {
        ...state,
        ...{ members: action.payload }
      };
    case actionTypes.LOAD_MEMBERS_SUCCESS:
      return {
        ...state,
        ...{ members: action.payload.members }
      };

    default:
      return state;
  }
}

export default reducer;
