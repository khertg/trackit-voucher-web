import { userConstants } from '../../constants/user.constants';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../../helpers/actionTypes';
// import { store } from '../store';


function login(email: string, password: string) {
  // return store.dispatch => {
  //     dispatch(request({ username }));

  //     userService.login(username, password)
  //         .then(
  //             user => { 
  //                 dispatch(success(user));
  //                 history.push('/');
  //             },
  //             error => {
  //                 dispatch(failure(error));
  //                 dispatch(alertActions.error(error));
  //             }
  //         );
  // };

  function request(user: any) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user: any) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error: any) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailed = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});
