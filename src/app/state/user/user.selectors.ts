import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

export const selectUser = (state: AppState) => state.user;
export const selectUserRole = createSelector(selectUser, (state: UserState) =>
  state.role?.valueOf()
);
export const selectUserisLoggedIn = createSelector(
  selectUser,
  (state: UserState) => state.isLoggedIn.valueOf()
);
