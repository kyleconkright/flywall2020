import { actionTypes } from "../actions/index";
import { Task } from "redux-saga";
import { ChamberOptions, ChamberNumber } from "../sagas";

// interface initState {
//   members: {};
//   selectedMember: any;
//   chamber: ChamberOptions;
//   chamberNumber: ChamberNumber;
// }

// export const defaultState: initState = {
//   members: {
//     senate: {},
//     house: {}
//   },
//   selectedMember: null,
//   chamber: "senate",
//   chamberNumber: 116
// };

export interface MemberState {
  senate: {};
  house: {};
}

export const DefaultMemberState: MemberState = {
  senate: {},
  house: {},
}

function reducer(state = DefaultMemberState, action) {
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
    case actionTypes.GET_COMPARE_DATA:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.COMPARE_DATA_SUCCESS:
      return {
        ...state,
        compareInfo: action.payload
      };
    case actionTypes.LOAD_MEMBERS_SUCCESS:
      const members = action.payload.members.reduce((acc, item) => {
        return {
          ...acc,
          [item.id]: item
        }
      },{});
      return {
        ...state,
        [action.payload.chamber]: members
      };

    default:
      return state;
  }
}

export default reducer;
