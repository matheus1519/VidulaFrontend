import React, { useEffect } from 'react';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import SideMenu from '../../components/Menu';
import { MenuPrincipal } from './estilos';
import './estilos.css';

export default function Dashboard({ history }) {
  // useEffect(() => {
  //   const userId = localStorage.getItem('user');
  //   if (userId === null) {
  //     history.push('/entrar');
  //   }
  // }, []);

  return (
    <>
      <MenuPrincipal>
        <SideMenu />
      </MenuPrincipal>
      <Container>Olá Pessoal</Container>
    </>
  );
}

Dashboard.defaultProps = {
  history: null,
};

Dashboard.propTypes = {
  history: PropTypes.shape(historyPropTypes),
};
