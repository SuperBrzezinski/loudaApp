import { state } from '@angular/animations';
import { createSelector } from '@ngrx/store';
import { startOfYesterday } from 'date-fns';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

export const selectUser = (state: AppState) => state.user;
export const selectGlobalState = (state: AppState) => state;
export const selectUserRole = createSelector(selectUser, (user: UserState) =>
  user.role?.valueOf()
);
export const selectUserisLoggedIn = createSelector(
  selectUser,
  (userState: UserState) => userState.isLoggedIn.valueOf()
);
export const selectUserState = createSelector(
  selectGlobalState,
  (state: AppState) => state.user
);
export const selectUserUid = createSelector(
  selectUser,
  (userState: UserState) => userState.uid?.valueOf()
);
export const selectUserName = createSelector(
  selectUser,
  (userState: UserState) => userState.name?.valueOf()
);
