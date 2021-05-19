import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { LoadingState } from '../../state/reducers/loadingReducer';

export const Load: React.FC = ({}) => {
  //Global State
  const loading = useSelector<LoadingState>((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  let { path } = useRouteMatch();
  return (
    <div>
      <h1>Load</h1>
      <hr />
      <NavLink to="/load">
        <button>Load</button>
      </NavLink>
      &nbsp;
      <NavLink to="/load/chupapi">
        <button>chupapi</button>
      </NavLink>{' '}
      &nbsp;
      <NavLink to="/load/munanyu">
        <button>munanyu</button>
      </NavLink>
      <hr />
      <Switch>
        <Route exact path={path}>
          <h3>Please select a Load.</h3>
        </Route>
        <Route path={`${path}/chupapi`}>
          <div>chupapi</div>
        </Route>
        <Route path={`${path}/munanyu`}>
          <div>munanyu</div>
        </Route>
      </Switch>
    </div>
  );
};
