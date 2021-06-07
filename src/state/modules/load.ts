import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export interface LoadState {
  load: LocalLoadState;
}

export interface LocalLoadState {
  toggleFilterForm: boolean;
}

const initialState = {
  toggleFilterForm: false,
} as LocalLoadState;

const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    toggleFilterForm: (state) => {
      state.toggleFilterForm = !state.toggleFilterForm;
    },
  },
});

const { toggleFilterForm } = loadSlice.actions;

// Action Creators

export const toggleFilterAction = createAction(toggleFilterForm.type);

export const toggleFilterSelector = (state: RootState) =>
  state.entities.load.toggleFilterForm;

export default loadSlice.reducer;
