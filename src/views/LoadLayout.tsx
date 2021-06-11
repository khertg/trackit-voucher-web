import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { toggleFilterAction } from '../state/modules/load';
import { Load } from './load/Load';
import { LoadCreate } from './load/LoadCreate';
import { LoadEdit } from './load/LoadEdit';
import { NotFound } from './NotFound';

export const LoadLayout: React.FC = () => {
  const dispatch = useDispatch();

  let { path } = useRouteMatch();
  return (
    <div style={{ backgroundColor: '#f4f4f4' }}>
      <h2>Load</h2>
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
          dispatch(toggleFilterAction());
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
