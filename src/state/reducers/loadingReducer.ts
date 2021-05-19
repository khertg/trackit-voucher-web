import { AnyAction } from 'redux';
import { HIDE_LOADING, SHOW_LOADING } from '../../helpers/actionTypes';

export interface LoadingState {
  loading: LocalLoadingState;
}

export interface LocalLoadingState {
  isLoading: boolean;
}

const initialState = { isLoading: false } as LocalLoadingState;

const loadingReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SHOW_LOADING:
      state.isLoading = true;
      return state;
    case HIDE_LOADING:
      state.isLoading = false;
      return state;
    default:
      return state;
  }
};

export default loadingReducer;
