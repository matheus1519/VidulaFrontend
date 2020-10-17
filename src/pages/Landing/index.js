import React from 'react';
import { ButtonLink, Button } from '~/components';

import icon from '~/assets/iconPlay.svg';

import { Container, Menu, Buttons, Content, Info } from './styles';
import SignIn from './SignIn';

function Landing() {
  return (
    <Container>
      <Menu>
        <img src={icon} alt="Logotipo Vidula" />
        <Buttons>
          <ButtonLink to="/aprender">Quero aprender</ButtonLink>
          <ButtonLink to="/ensinar">Quero ensinar</ButtonLink>
        </Buttons>
      </Menu>
      <Content>
        <Info>
          <h3>Aprenda em menos de 5 minutos.</h3>
          <h2>
            Decida você mesmo quais conteúdos assistir e trilhe seu próprio
            caminho nos estudos.
          </h2>
          <Button type="secondary" onClick={() => console.log('CADASTRAR')}>
            QUERO ME CADASTRAR
          </Button>
        </Info>
        <SignIn />
      </Content>
    </Container>
  );
}

export default Landing;
