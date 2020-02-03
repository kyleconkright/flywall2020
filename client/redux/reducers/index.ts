import { actionTypes } from "../actions/index";
import { Task } from "redux-saga";
import { ChamberOptions, ChamberNumber } from "../sagas";

interface initState {
  members: any[];
  selectedMember: any;
  sagaTask: Task;
  chamber: ChamberOptions;
  chamberNumber: ChamberNumber;
}

export const defaultState: initState = {
  members: null,
  selectedMember: null,
  sagaTask: null,
  chamber: "senate",
  chamberNumber: 116
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };
    case actionTypes.UPDATE_CHAMBER:
      return {
        ...state,
        ...{ chamber: action.payload.chamber }
      };
    case actionTypes.UPDATE_CHAMBER_NUMBER:
      return {
        ...state,
        ...{ chamberNumber: action.payload.chamberNumber }
      };

    case actionTypes.LOAD_MEMBERS:
      return {
        ...state
      };
    case actionTypes.LOAD_MEMBERS_SUCCESS:
    case actionTypes.LOAD_MEMBERS_CLIENT_SUCCESS:
      return {
        ...state,
        ...{ members: action.payload.members }
      };

    default:
      return state;
  }
}

export default reducer;
