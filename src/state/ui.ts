import { combineReducers } from 'redux';
import loadingReducer from './modules/loading';

export default combineReducers({
  loading: loadingReducer,
});
