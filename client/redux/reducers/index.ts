import { combineReducers } from 'redux'
import members, { MemberState, DefaultMemberState } from './members';
import menu, { MenuState, DefaultMenuState } from './menu';

export interface AppState {
  members: MemberState,
  menu: MenuState
}

export const DefaultAppState: AppState = {
  members: DefaultMemberState,
  menu: DefaultMenuState
}


export default combineReducers({
  members,
  menu
})