import { AnyAction } from 'redux';
import {
  HIDE_LOADING,
  HIDE_LOGIN_LOADING,
  SHOW_LOADING,
  SHOW_LOGIN_LOADING,
} from '../../helpers/actionTypes';

export interface LoadingState {
  loading: LocalLoadingState;
}

export interface LocalLoadingState {
  isLoading: boolean;
  loginLoading: boolean;
}

const initialState = {
  isLoading: false,
  loginLoading: false,
} as LocalLoadingState;

const loadingReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SHOW_LOADING:
      state.isLoading = true;
      return state;
    case HIDE_LOADING:
      state.isLoading = false;
      return state;
    case SHOW_LOGIN_LOADING:
      state.loginLoading = true;
      return state;
    case HIDE_LOGIN_LOADING:
      state.loginLoading = false;
      return state;
    default:
      return state;
  }
};

export default loadingReducer;
