import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { deleteAll } from '../services/voucher';
import { toggleFilter } from '../state/actions/filterAction';
import { hideLoading, showLoading } from '../state/actions/loadingAction';
import {
  setReloadVoucher,
  setSelectedVoucher,
} from '../state/actions/voucherAction';
import { VoucherState } from '../state/reducers/voucherReducer';
import { NotFound } from './NotFound';
import { Voucher } from './voucher/Voucher';
import { VoucherCreate } from './voucher/VoucherCreate';
import { VoucherCSVUpload } from './voucher/VoucherCSVUpload';
import { VoucherEdit } from './voucher/VoucherEdit';

export const VoucherLayout: React.FC = () => {
  //Global state
  const selectedVoucher = useSelector(
    (state: VoucherState) => state.voucher.selected
  );
  const reloadList = useSelector(
    (state: VoucherState) => state.voucher.reloadList
  );
  const dispatch = useDispatch();

  let { path } = useRouteMatch();
  return (
    <div>
      <h1>Voucher</h1>
      <hr />
      <NavLink to="/voucher">
        <button>Voucher List</button>
      </NavLink>
      &nbsp;
      <NavLink to="/voucher/create">
        <button>Create</button>
      </NavLink>
      &nbsp;
      <NavLink to="/voucher/csv-upload">
        <button>Import CSV</button>
      </NavLink>
      &nbsp;
      <button
        onClick={() => {
          dispatch(toggleFilter());
        }}
      >
        Toggle Filter Option
      </button>
      &nbsp;
      <button
        onClick={() => {
          if (
            window.confirm(
              'Are you sure you want to delete all selected vouchers?'
            )
          ) {
            dispatch(showLoading());
            deleteAll([...selectedVoucher.map(({ id }) => id)])
              .then(() => {
                dispatch(setReloadVoucher(!reloadList));
                dispatch(setSelectedVoucher([]));
              })
              .catch((err) => {
                console.log(err);
                alert('Error occured while deleting');
                dispatch(hideLoading());
              });
          }
        }}
        disabled={selectedVoucher.length <= 0}
      >
        Delete Selected({selectedVoucher.length})
      </button>
      <hr />
      <Switch>
        <Route exact path={path}>
          <Voucher />
        </Route>
        <Route path={`${path}/create`}>
          <VoucherCreate />
        </Route>
        <Route path={`${path}/csv-upload`}>
          <VoucherCSVUpload />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <VoucherEdit />
        </Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </div>
  );
};
