import { createAction, props } from '@ngrx/store';
import { Role } from 'src/app/shared/models/role.model';

export const removeRole = createAction('[Navbar - Log Out] Remove Role');

export const logIn = createAction(
  '[Sign-in Page] Log In',
  props<{
    name: string;
    role: Role;
    uid: string;
    lastOrderDate: string | null;
  }>()
);

export const logOut = createAction('[Navbar - Log Out] Log Out');
