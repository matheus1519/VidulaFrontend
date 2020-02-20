import React, { useEffect } from 'react';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import Menu from '../../components/Menu';

export default function Dashboard({ history }) {
  // useEffect(() => {
  //   const userId = localStorage.getItem('user');
  //   if (userId === null) {
  //     history.push('/entrar');
  //   }
  // }, []);

  return (
    <>
      <Menu />
      <div className="container">Dashboard</div>
    </>
  );
}

Dashboard.defaultProps = {
  history: null,
};

Dashboard.propTypes = {
  history: PropTypes.shape(historyPropTypes),
};
