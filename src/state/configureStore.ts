import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import api from './middleware/api';
import reducer from './reducer';

const middleware = [api, ...getDefaultMiddleware()];

const store = configureStore({
  reducer,
  middleware,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export type RootState = ReturnType<typeof store.getState>;
export default store;
