import { combineReducers, createStore } from 'redux';
import filterReducer from './reducers/filterReducer';
import loadingReducer from './reducers/loadingReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  filter: filterReducer,
});

export const store = createStore(rootReducer);
