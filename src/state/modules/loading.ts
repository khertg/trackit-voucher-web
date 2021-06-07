import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export interface LoadingState {
  loading: LocalLoadingState;
}

export interface LocalLoadingState {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
} as LocalLoadingState;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
});

const { showLoading, hideLoading } = loadingSlice.actions;

// Action Creators

export const showGlobalLoading = createAction(showLoading.type);
export const hideGlobalLoading = createAction(hideLoading.type);

export const globalLoadingSelector = (state: RootState) => state.ui.loading.isLoading;

export default loadingSlice.reducer;
