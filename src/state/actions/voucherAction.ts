import {
  SET_RELOAD_VOUCHER,
  SET_SELECTED_VOUCHER,
} from '../../helpers/actionTypes';
import { ISelectedVoucher } from '../../models/voucher';

export const setSelectedVoucher = (selectedVoucher: ISelectedVoucher[]) => ({
  type: SET_SELECTED_VOUCHER,
  payload: selectedVoucher,
});

export const setReloadVoucher = (reloadVoucher: boolean) => ({
  type: SET_RELOAD_VOUCHER,
  payload: reloadVoucher,
});
