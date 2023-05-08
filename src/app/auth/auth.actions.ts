import { Usuario } from './../models/usuario.model';
import { createAction, props } from '@ngrx/store';

export const setUser = createAction('[Auth] Set user',
  props<{ user: Usuario }>()
);

export const unsetUser = createAction('[Auth] Unset user');
