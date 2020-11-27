/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  permission,
  ...rest
}) {
  const { signed } = useSelector(state => state.auth);
  const accessLevel = useSelector(state => state.user.user?.accessLevel);

  if (!signed && permission) {
    return <Redirect to="/" />;
  }

  if (signed && !permission) {
    return <Redirect to="/assistir" />;
  }

  if (permission === 'admin' && accessLevel < 3) {
    return <Redirect to="/assistir" />;
  }

  if (permission === 'teacher' && accessLevel < 2) {
    return <Redirect to="/assistir" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
