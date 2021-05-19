import { AnyAction } from 'redux';
import {
  SHOW_FILTER,
  HIDE_FILTER,
  TOGGLE_FILTER,
} from '../../helpers/actionTypes';

export interface FilterState {
  filter: LocalFilterState;
}

export interface LocalFilterState {
  showFilter: boolean;
}

const initialState = { showFilter: false } as LocalFilterState;

const loadingReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SHOW_FILTER:
      state.showFilter = true;
      return state;
    case HIDE_FILTER:
      state.showFilter = false;
      return state;
    case TOGGLE_FILTER:
      console.log('Toggle Filter', state.showFilter);
      state.showFilter = !state.showFilter;
      return state;
    default:
      return state;
  }
};

export default loadingReducer;
