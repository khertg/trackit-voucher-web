import {
  HIDE_LOADING,
  HIDE_LOGIN_LOADING,
  SHOW_LOADING,
  SHOW_LOGIN_LOADING,
} from '../../helpers/actionTypes';

export const showLoading = () => ({
  type: SHOW_LOADING,
});

export const hideLoading = () => ({
  type: HIDE_LOADING,
});

export const showLoginLoading = () => ({
  type: SHOW_LOGIN_LOADING,
});

export const hideLoginLoading = () => ({
  type: HIDE_LOGIN_LOADING,
});
