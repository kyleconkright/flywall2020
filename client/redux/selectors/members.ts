import { createSelector } from 'reselect';

const getMembers = state => {
  return state.members;
};

export const selectMembers = createSelector(
  getMembers,
  (members) => members
);