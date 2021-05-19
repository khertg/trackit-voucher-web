import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import {
  hideFilter,
  toggleFilter,
  showFilter,
} from '../state/actions/filterAction';
import { FilterState } from '../state/reducers/filterReducer';
import { NotFound } from './NotFound';
import { UnderContruction } from './UnderContruction';
import { Voucher } from './voucher/Voucher';
import { VoucherCreate } from './voucher/VoucherCreate';
import { VoucherEdit } from './voucher/VoucherEdit';

export const LoadLayout: React.FC = () => {
  //Global State
  const showFilterState = useSelector<FilterState>(
    (state) => state.filter.showFilter
  );
  const dispatch = useDispatch();

  let { path } = useRouteMatch();
  return (
    <div>
      <h1>Load</h1>
      <hr />
      <NavLink to="/load">
        <button>Load List</button>
      </NavLink>
      &nbsp;
      <NavLink to="/load/create">
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
          <UnderContruction />
        </Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </div>
  );
};
