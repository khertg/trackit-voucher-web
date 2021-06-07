import { AnyAction } from 'redux';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../../helpers/actionTypes';

export interface AuthState {
  auth: LocalAuthState;
}

export interface LocalAuthState {
  is_authenticated: boolean;
  token: string;
}

const initialState = {
} as LocalAuthState;

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      state.is_authenticated = true;
      return state;
    case LOGIN_FAILURE:
      state.is_authenticated = false;
      return state;
    case LOGOUT:
      state.is_authenticated = false;
      return state;
    default:
      return state;
  }
};

export default authReducer;
