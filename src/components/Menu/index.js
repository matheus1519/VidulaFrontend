import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ButtonLink from '../ButtonLink';

import { Container, LinksGroup } from './styles';
import Logo from '../Logo';
import { signOut } from '~/store/modules/auth/actions';

function Menu() {
  const dispatch = useDispatch();

  const onSignOut = useCallback(() => {
    dispatch(signOut());
  }, []);

  return (
    <Container>
      <div>
        <Logo outline />
        <LinksGroup>
          <ButtonLink to="/administrativo">Administrativo</ButtonLink>
          <ButtonLink to="/preparar-aula">Preparar Aulas</ButtonLink>
          <ButtonLink to="/minha-conta">Minha Conta</ButtonLink>
          <ButtonLink onClick={onSignOut}>Sair</ButtonLink>
        </LinksGroup>
      </div>
    </Container>
  );
}

export default Menu;
