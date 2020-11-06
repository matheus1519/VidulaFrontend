import React from 'react';
import { ButtonLink, Logo } from '~/components';

import { Container, Buttons } from './styles';

function InitialMenu({ active }) {
  return (
    <Container>
      <Logo disabled={active === 'initial'} />
      <Buttons>
        <ButtonLink disabled={active === 'learn'} to="/aprender">
          Quero aprender
        </ButtonLink>
        <ButtonLink disabled={active === 'teach'} to="/ensinar">
          Quero ensinar
        </ButtonLink>
      </Buttons>
    </Container>
  );
}

export default InitialMenu;
