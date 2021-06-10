import { Action, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../../helpers/auth-common';
import { handleError } from '../../helpers/services-common';
import * as actions from '../modules/api';
import { ApiAction } from '../modules/api';
import { logoutUser } from '../modules/auth';

type PromiseDispatch = <T extends Action>(promise: Promise<T>) => Promise<T>;

const api: Middleware<PromiseDispatch> =
  ({ dispatch }) =>
  (next) =>
  async (action: ApiAction) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const payload = action.payload;

    // Mostly Show Loading
    if (payload.onStart) dispatch({ type: payload.onStart });
    if (payload.onProcess) dispatch({ type: payload.onProcess });
    if (payload.onUpdateFilter) {
      console.log(payload.filterPayload);
      dispatch({
        type: payload.onUpdateFilter,
        payload: payload.filterPayload,
      });
    }
    next(action);

    try {
      const config: AxiosRequestConfig = {
        baseURL: process.env.REACT_APP_API_URL,
        url: payload.url,
        method: payload.method,
        data: payload.data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const response = await axios.request(config);

      // General
      dispatch(actions.apiCallSuccess(response.data.result));

      // Specific
      if (payload.onSuccess)
        dispatch({ type: payload.onSuccess, payload: response.data.result });
      if (payload.onEnd) dispatch({ type: payload.onEnd });
    } catch (error) {
      const errorMsgArr = handleError(error);

      // General
      dispatch(actions.apiCallFailed(errorMsgArr));

      if (error.response && error.response.status === 401) {
        dispatch(logoutUser());
      }

      // Specific
      if (payload.onError)
        dispatch({ type: payload.onError, payload: errorMsgArr });

      // Mostly Hide Loading
      if (payload.onEnd) dispatch({ type: payload.onEnd });
    }
  };

export default api;
