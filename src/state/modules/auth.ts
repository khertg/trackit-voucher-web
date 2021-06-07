import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { isAuth, removeToken, setToken } from '../../helpers/auth-common';
import axios from 'axios';
import { getApiURL, handleError } from '../../helpers/services-common';

export interface AuthState {
  auth: LocalAuthState;
}

export interface LocalAuthState {
  is_authenticated: boolean;
  loading: boolean;
  errors: string[];
}

// Action Creators
export const login = createAsyncThunk<
  any,
  { email: string; password: string },
  {}
>('auth/login', async (data, thunkAPI) => {
  try {
    const response = await axios.post(getApiURL('/auth/login'), data);
    setToken(response.data.result.token);
    return response.data;
  } catch (e) {
    const errorMsgArr = handleError(e);
    return thunkAPI.rejectWithValue(errorMsgArr);
  }
});

export const logoutUser = () => {
  removeToken();
  return { type: logout.type };
};

const initialState = {
  is_authenticated: isAuth(),
  loading: false,
  errors: [],
} as LocalAuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeToken();
      state.is_authenticated = false;
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.loading = true;
      state.errors = [];
    },
    [login.fulfilled.type]: (state) => {
      state.is_authenticated = true;
      state.loading = false;
      state.errors = [];
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<string[]>) => {
      state.errors = payload;
      state.loading = false;
    },
  },
});

const { logout } = authSlice.actions;

// Selectors
export const authSelector = (state: RootState) => state.entities.auth;
export const isAuthSelector = (state: RootState) =>
  state.entities.auth.is_authenticated;
export const loadingSelector = (state: RootState) =>
  state.entities.auth.loading;
export const errorSelector = (state: RootState) => state.entities.auth.errors;

// Reducer
export default authSlice.reducer;
