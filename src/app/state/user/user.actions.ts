import { createAction, props } from '@ngrx/store';
import { Role } from 'src/app/shared/models/role.model';

export const addRole = createAction(
  '[Sign-in Page] Add Role',
  props<{ role: Role }>()
);

export const removeRole = createAction('[Navbar - Log Out] Remove Role');

export const logIn = createAction('[Sign-in Page] Log In');

export const logOut = createAction('[Navbar - Log Out] Log Out');
