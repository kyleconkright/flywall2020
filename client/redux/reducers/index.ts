import { actionTypes } from "../actions/index";
import { Task } from "redux-saga";
import { ChamberOptions, ChamberNumber } from "../sagas";
import { Bill } from "../../pages/bills";

interface initState {
  fullCongress: { house: any[]; senate: any[] };
  members: any;
  selectedMember: any;
  sagaTask: Task;
  chamber: ChamberOptions;
  chamberNumber: ChamberNumber;
  billSearchQuery: string;
  bills: Bill[];
}

export const defaultState: initState = {
  members: null,
  selectedMember: null,
  sagaTask: null,
  chamber: "senate",
  chamberNumber: 116,
  fullCongress: null,
  billSearchQuery: "",
  bills: []
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
    case actionTypes.SEARCH_BILLS_QUERY_UPDATE:
      return {
        ...state,
        billSearchQuery: action.payload.query
      };
    case actionTypes.SEARCH_BILLS_SUCCESS:
      console.log("payload ", action.payload);
      return {
        ...state,
        bills: action.payload.bills,
        billSearchQuery: action.payload.query
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
    case actionTypes.LOAD_FULL_CONGRESS:
      return {
        ...state,
        congressNumber: action.payload
      };
    case actionTypes.LOAD_FULL_CONGRESS_SUCCESS:
      return {
        ...state,
        fullCongress: action.payload
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
