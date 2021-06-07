import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { deleteAll } from '../services/voucher';
import { hideLoading, showLoading } from '../state/actions/loadingAction';
import { setSelectedVoucher } from '../state/actions/voucherAction';
import { hideGlobalLoading, showGlobalLoading } from '../state/modules/loading';
import {
  fetchVoucherAction,
  selectedVoucherSelector,
  toggleFilterAction,
  voucherFilterSelector,
} from '../state/modules/voucher';
import { NotFound } from './NotFound';
import { Voucher } from './voucher/Voucher';
import { VoucherCreate } from './voucher/VoucherCreate';
import { VoucherCSVUpload } from './voucher/VoucherCSVUpload';
import { VoucherEdit } from './voucher/VoucherEdit';

export const VoucherLayout: React.FC = () => {
  //Global state
  const selectedVoucher = useSelector(selectedVoucherSelector);
  const voucherFilter = useSelector(voucherFilterSelector);

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
          dispatch(toggleFilterAction());
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
            dispatch(showGlobalLoading());
            deleteAll([...selectedVoucher.map(({ id }) => id)])
              .then(() => {
                dispatch(
                  fetchVoucherAction({
                    ...voucherFilter,
                    page: 0,
                  })
                );
                alert(
                  `Successfully deleted ${selectedVoucher.length} vouchers.`
                );
                dispatch(hideGlobalLoading());
              })
              .catch((err) => {
                console.log(err);
                alert('Error occured while deleting');
                dispatch(hideGlobalLoading());
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
