import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unsetUser } from './auth.actions';

export interface State {
    user: Usuario;
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,
    on(setUser, (state, { user }) => ({ ...state, user: {...user}})),
    on(unsetUser, state => ({ ...state, user: null}))
);

export const authReducer = (state = initialState, action: Action) => _authReducer(state, action);
