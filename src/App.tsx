import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { LoginRoute } from './components/LoginRoute';
import { PrivateRoute } from './components/PrivateRoute';
import history from './history';
import { logoutUser } from './state/modules/auth';
import { RootState } from './state/configureStore';
import { LoadLayout } from './views/LoadLayout';
import { Login } from './views/Login';
import { NotFound } from './views/NotFound';
import { VoucherLayout } from './views/VoucherLayout';
import { globalLoadingSelector } from './state/modules/loading';

const App: React.FC = () => {
  //Global State
  const loading = useSelector(globalLoadingSelector);
  const authenticated = useSelector<RootState>(
    (state) => state.entities.auth.is_authenticated
  );
  const dispatch = useDispatch();

  return (
    <Fragment>
      {authenticated && (
        <Fragment>
          <hr />
          <NavLink to="/voucher">
            <button>Voucher</button>
          </NavLink>
          &nbsp;
          <NavLink to="/load">
            <button>Load</button>
          </NavLink>
          &nbsp;
          <button
            onClick={async () => {
              await dispatch(logoutUser());
              history.push('/login');
            }}
          >
            Logout
          </button>
          <hr />
        </Fragment>
      )}
      {loading && (
        <div className="loading">
          <div className="loading-dialog">
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
      <Switch>
        <LoginRoute path="/login" component={Login} />
        <Redirect exact={true} from="/" to="/voucher" />
        <PrivateRoute path="/voucher" component={VoucherLayout} />
        <PrivateRoute path="/load" component={LoadLayout} />
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Fragment>
  );
};

export default App;
