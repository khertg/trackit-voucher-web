import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthSelector } from '../state/modules/auth';

type ProtectedRouteProps = {} & RouteProps;

export const LoginRoute: React.FC<ProtectedRouteProps> = ({
  ...routeProps
}) => {
  const authenticated = useSelector(isAuthSelector);

  if (!authenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: '/' }} />;
  }
};
