import { createReducer, on } from '@ngrx/store';
import { startOfYesterday } from 'date-fns';
import { Role } from 'src/app/shared/models/role.model';
import { lastOrderDateUpdate, logIn, logOut, removeRole } from './user.actions';

export interface UserState {
  uid: string | null;
  name: string | null;
  role: Role;
  isLoggedIn: boolean;
  lastOrderDate: string | null;
}

export const initialState: UserState = {
  uid: null,
  name: null,
  role: null,
  isLoggedIn: false,
  lastOrderDate: null,
};

export const userReducer = createReducer(
  initialState,
  on(removeRole, (state) => ({
    ...state,
    role: null,
  })),
  on(logIn, (state, { role, name, uid, lastOrderDate }) => ({
    ...state,
    name: name,
    role: role,
    uid: uid,
    lastOrderDate: lastOrderDate,
    isLoggedIn: true,
  })),
  on(logOut, (state) => ({
    ...state,
    name: null,
    role: null,
    uid: null,
    isLoggedIn: false,
    lastOrderDate: null,
  })),
  on(lastOrderDateUpdate, (state, { lastOrderDate }) => ({
    ...state,
    lastOrderDate: lastOrderDate,
  }))
);
