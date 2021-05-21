import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { toggleFilter } from '../state/actions/filterAction';
import { Load } from './load/Load';
import { LoadCreate } from './load/LoadCreate';
import { LoadEdit } from './load/LoadEdit';
import { NotFound } from './NotFound';

export const LoadLayout: React.FC = () => {
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
          <Load />
        </Route>
        <Route path={`${path}/create`}>
          <LoadCreate />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <LoadEdit />
        </Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </div>
  );
};
