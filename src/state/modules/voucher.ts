import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import {
  IPagedVoucher,
  ISelectedVoucher,
  IVoucher,
  IVoucherFilter,
} from '../../models/voucher';
import { hideGlobalLoading, showGlobalLoading } from './loading';
import { apiCallBegan, ApiAction } from './api';
import { rowPerPage } from '../../helpers/common';
import { buildQueryParams } from '../../helpers/services-common';

export interface VoucherState {
  voucher: LocalVoucherState;
}

export interface LocalVoucherState {
  data: IVoucher[];
  selected: ISelectedVoucher[];
  toggleFilterForm: boolean;
  filter: IVoucherFilter;
  totalPage: number;
  totalItems: number;
  rowPerPage: number;
  currentPage: number;
}

// Action Creators

export const fetchVoucherAction = (filter?: IVoucherFilter): ApiAction => ({
  type: apiCallBegan.type,
  payload: {
    url: `/api/v1/voucher?${buildQueryParams(filter)}`,
    onStart: showGlobalLoading.type,
    onProcess: pagedVoucherPending.type,
    onSuccess: pagedVoucherFulfilled.type,
    onEnd: hideGlobalLoading.type,
  },
});

export const updateFilterAction = (filter: IVoucherFilter): ApiAction => {
  const action = fetchVoucherAction(filter);
  action.payload.onUpdateFilter = updateFilter.type;
  action.payload.filterPayload = filter;
  return action;
};

export const updateRowCountPerPageAction = (
  filter: IVoucherFilter
): ApiAction => {
  const action = fetchVoucherAction(filter);
  action.payload.onUpdateFilter = updateRowCountPerPage.type;
  action.payload.filterPayload = filter.limit;
  return action;
};

export const updateCurrentPageAction = (currentPage: number) => ({
  type: updateCurrentPage.type,
  payload: currentPage,
});

export const setSelectedVoucherAction = (
  selectedVouchers: ISelectedVoucher[]
) => ({
  type: setSelectedVoucher.type,
  payload: selectedVouchers,
});

export const setVoucherFilterAction = (filter: IVoucherFilter) => ({
  type: setVoucherFilter.type,
  payload: filter,
});

export const setVoucherPagedAction = (vouchers: IVoucher[]) => ({
  type: pagedVoucherFulfilled.type,
  payload: vouchers,
});

export const toggleFilterAction = () => ({
  type: toggleFilter.type,
});

export const setRowCountPerPageAction = (rowCount: number) => ({
  type: setRowCountPerPage.type,
  payload: rowCount,
});

// Voucher State

const initialState = {
  data: [],
  selected: [],
  toggleFilterForm: false,
  filter: {
    sold: '',
    sort_by: 'id:desc',
    limit: rowPerPage(),
    page: 0,
  },
  totalPage: 0,
  totalItems: 0,
  rowPerPage: rowPerPage(),
  currentPage: 0,
} as LocalVoucherState;

// Voucher Slice

const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    pagedVoucherPending: (state) => {
      state.data = [];
    },
    pagedVoucherFulfilled: (state, action: PayloadAction<IPagedVoucher>) => {
      state.data = action.payload.data;
      state.totalPage = action.payload.totalPages;
      state.totalItems = action.payload.totalItems;
      state.filter.page = action.payload.currentPage;
      state.currentPage = action.payload.currentPage;
      state.selected = [];
    },
    setSelectedVoucher: (state, action: PayloadAction<ISelectedVoucher[]>) => {
      state.selected = action.payload;
    },
    setVoucherFilter: (state, action: PayloadAction<IVoucherFilter>) => {
      state.filter = action.payload;
    },
    updateFilter: (state, action: PayloadAction<IVoucherFilter>) => {
      state.filter = action.payload;
    },
    toggleFilter: (state) => {
      state.toggleFilterForm = !state.toggleFilterForm;
    },
    setRowCountPerPage: (state, action: PayloadAction<number>) => {
      state.rowPerPage = action.payload;
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updateRowCountPerPage: (state, action: PayloadAction<number>) => {
      state.rowPerPage = action.payload;
      state.filter.limit = action.payload;
      state.selected = [];
      state.filter.page = 0;
      state.currentPage = 0;
    },
  },
});

const {
  setSelectedVoucher,
  toggleFilter,
  setVoucherFilter,
  setRowCountPerPage,
  pagedVoucherPending,
  pagedVoucherFulfilled,
  updateFilter,
  updateRowCountPerPage,
  updateCurrentPage,
} = voucherSlice.actions;

// Selectors
export const voucherSelector = (state: RootState) =>
  state.entities.voucher.data;

export const selectedVoucherSelector = (state: RootState) =>
  state.entities.voucher.selected;

export const voucherFilterSelector = (state: RootState) =>
  state.entities.voucher.filter;

export const voucherCurrenPageSelector = (state: RootState) =>
  state.entities.voucher.currentPage;

export const voucherToggleFilterSelector = (state: RootState) =>
  state.entities.voucher.toggleFilterForm;

export const voucherPageFilterSelector = (state: RootState) =>
  state.entities.voucher.filter.page;

export const voucherTotalPageSelector = (state: RootState) =>
  state.entities.voucher.totalPage;

export const voucherTotalItemsSelector = (state: RootState) =>
  state.entities.voucher.totalItems;

export const voucherRowCountPerPageSelector = (state: RootState) =>
  state.entities.voucher.rowPerPage;

// Reducer
export default voucherSlice.reducer;
