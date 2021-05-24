import { combineReducers, createStore } from 'redux';
import filterReducer from './reducers/filterReducer';
import loadingReducer from './reducers/loadingReducer';
import voucherReducer from './reducers/voucherReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  filter: filterReducer,
  voucher: voucherReducer,
});

export const store = createStore(rootReducer);
