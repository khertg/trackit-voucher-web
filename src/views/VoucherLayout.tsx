import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { toggleFilter } from '../state/actions/filterAction';
import { NotFound } from './NotFound';
import { Voucher } from './voucher/Voucher';
import { VoucherCreate } from './voucher/VoucherCreate';
import { VoucherEdit } from './voucher/VoucherEdit';

export const VoucherLayout: React.FC = () => {
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
      <button
        onClick={() => {
          dispatch(toggleFilter());
        }}
      >
        Toggle Filter Option
      </button>
      <hr />
      <Switch>
        <Route exact path={path}>
          <Voucher />
        </Route>
        <Route path={`${path}/create`}>
          <VoucherCreate />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <VoucherEdit />
        </Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </div>
  );
};
