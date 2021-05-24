import { AnyAction } from 'redux';
import { SET_RELOAD_VOUCHER, SET_SELECTED_VOUCHER } from '../../helpers/actionTypes';
import { ISelectedVoucher } from '../../models/voucher';

export interface VoucherState {
  voucher: LocalVoucherState;
}

export interface LocalVoucherState {
  selected: ISelectedVoucher[];
  reloadList: boolean;
}

const initialState = { selected: [], reloadList: false } as LocalVoucherState;

const voucherReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_SELECTED_VOUCHER:
      state.selected = action.payload;
      return state;
    case SET_RELOAD_VOUCHER:
      state.reloadList = action.payload;
      return state;
    default:
      return state;
  }
};

export default voucherReducer;
