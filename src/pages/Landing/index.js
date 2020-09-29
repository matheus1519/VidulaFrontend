import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '~/components';

import icon from '~/assets/iconPlay.svg';

import { Container, Menu, Buttons } from './styles';

function Landing() {
  return (
    <Container>
      <Menu>
        <Link to="/">
          <img src={icon} alt="Logotipo Vidula" />
        </Link>
        <Buttons>
          <ButtonLink to="/aprender">Quero aprender</ButtonLink>
          <ButtonLink to="/ensinar">Quero ensinar</ButtonLink>
        </Buttons>
      </Menu>
    </Container>
  );
}

export default Landing;
