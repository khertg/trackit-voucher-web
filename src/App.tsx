import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { LoadingState } from './state/reducers/loadingReducer';
import { Home } from './views/home/Home';
import { LoadLayout } from './views/LoadLayout';
import { NotFound } from './views/NotFound';
import { VoucherLayout } from './views/VoucherLayout';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loading = useSelector<LoadingState>((state) => state.loading.isLoading);
  return (
    <Fragment>
      <hr />
      {/* <NavLink to="/">
        <button>Home</button>
      </NavLink>
      &nbsp; */}
      <NavLink to="/voucher">
        <button>Voucher</button>
      </NavLink>
      &nbsp;
      <NavLink to="/load">
        <button>Load</button>
      </NavLink>
      <hr />
      {loading && (
        <div className="loading">
          <div className="loading-dialog">Loading ...</div>
        </div>
      )}
      <Switch>
        {/* <Route exact={true} path="/">
          <Home />
        </Route> */}
        <Redirect exact={true} from="/" to="/voucher" />
        <Route path="/voucher">
          <VoucherLayout />
        </Route>
        <Route path="/load">
          <LoadLayout />
        </Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Fragment>
  );
};

export default App;
