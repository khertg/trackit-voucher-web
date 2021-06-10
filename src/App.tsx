import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, NavLink, Redirect, useHistory } from 'react-router-dom';
import { LoginRoute } from './components/LoginRoute';
import { PrivateRoute } from './components/PrivateRoute';
// import history from './history';
import { logoutUser } from './state/modules/auth';
import { RootState } from './state/configureStore';
import { LoadLayout } from './views/LoadLayout';
import { Login } from './views/Login';
import { NotFound } from './views/NotFound';
import { VoucherLayout } from './views/VoucherLayout';
import { globalLoadingSelector } from './state/modules/loading';
import {
  Badge,
  Button,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { Home } from './views/home/Home';

const App: React.FC = () => {
  //Global State
  const loading = useSelector(globalLoadingSelector);
  const authenticated = useSelector<RootState>(
    (state) => state.entities.auth.is_authenticated
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const getNavLinkClass = (path: string) => {
    return history.location.pathname === path ? 'active' : '';
  };

  return (
    <Fragment>
      {authenticated && (
        <Navbar
          collapseOnSelect
          style={{ height: '65px', backgroundColor: '#141517' }}
        >
          <NavLink className="navbar-brand" style={colorWhite} to="/">
            Trackit&nbsp;
            <Badge style={{ fontSize: '10px' }} variant="info">
              v1.0.0
            </Badge>
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link
                style={{ fontSize: '14px', color: 'white' }}
                onClick={async () => {
                  await dispatch(logoutUser());
                  history.push('/login');
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
      {authenticated && (
        <div style={{ backgroundColor: '#fff' }}>
          <ul className="nav sub-nav">
            <li className={`nav-item ${getNavLinkClass('/')}`}>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className={`nav-item ${getNavLinkClass('/voucher')}`}>
              <NavLink className="nav-link" to="/voucher">
                Voucher
              </NavLink>
            </li>
            <li className={`nav-item ${getNavLinkClass('/load')}`}>
              <NavLink className="nav-link" to="/load">
                Load
              </NavLink>
            </li>
          </ul>
        </div>
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
        <PrivateRoute exact path="/" component={Home} />
        <LoginRoute path="/login" component={Login} />
        <PrivateRoute path="/voucher" component={VoucherLayout} />
        <PrivateRoute path="/load" component={LoadLayout} />
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Fragment>
  );
};

const colorWhite = {
  color: 'white',
};
export default App;
