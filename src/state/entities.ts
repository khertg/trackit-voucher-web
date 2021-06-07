import { combineReducers } from 'redux';
import authReducer from './modules/auth';
import voucherReducer from './modules/voucher';
import loadReducer from './modules/load';

export default combineReducers({
  auth: authReducer,
  voucher: voucherReducer,
  load: loadReducer,
});
