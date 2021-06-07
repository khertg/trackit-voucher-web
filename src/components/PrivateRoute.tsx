import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from '../state/configureStore';

type ProtectedRouteProps = {} & RouteProps;

export const PrivateRoute: React.FC<ProtectedRouteProps> = ({
  ...routeProps
}) => {
  const authenticated = useSelector<RootState, boolean>(
    (state) => state.entities.auth.is_authenticated
  );

  if (authenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
};
