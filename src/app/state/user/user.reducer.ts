import { createReducer, on } from '@ngrx/store';
import { Role } from 'src/app/shared/models/role.model';
import { addRole, logIn, logOut, removeRole } from './user.actions';

export interface UserState {
  role: Role;
  isLoggedIn: boolean;
}

export const initialState: UserState = {
  role: null,
  isLoggedIn: false,
};

export const userReducer = createReducer(
  initialState,
  on(addRole, (state, { role }) => ({
    ...state,
    role: role,
  })),
  on(removeRole, (state) => ({
    ...state,
    role: null,
  })),
  on(logIn, (state) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(logOut, (state) => ({
    ...state,
    isLoggedIn: false,
  }))
);
