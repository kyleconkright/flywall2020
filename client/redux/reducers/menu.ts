import { actionTypes } from "../actions/index";

export interface MenuState {
  senate: boolean;
  house: boolean;
  congress: number;
}

export const DefaultMenuState: MenuState = {
  senate: false,
  house: false,
  congress: 117
};

function reducer(state = DefaultMenuState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };
    case actionTypes.UPDATE_CHAMBER: {
      return {
        ...state,
        [action.payload.chamber]: !state[action.payload.chamber]
      };
    }

    default:
      return state;
  }
}

export default reducer;
