import React from 'react';
import ButtonLink from '../ButtonLink';

import { Container, LinksGroup } from './styles';
import Logo from '../Logo';

function Menu() {
  return (
    <Container>
      <div>
        <Logo outline />
        <LinksGroup>
          <ButtonLink to="/administrativo">Administrativo</ButtonLink>
          <ButtonLink to="/minha-conta">Gerenciar Aulas</ButtonLink>
          <ButtonLink to="/preparar-aula">Minha Conta</ButtonLink>
          <ButtonLink>Sair</ButtonLink>
        </LinksGroup>
      </div>
    </Container>
  );
}

export default Menu;
