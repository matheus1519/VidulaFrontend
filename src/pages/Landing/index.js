import React, { useState } from 'react';
import { InitialMenu, Button, SignUp } from '~/components';

import { Container, Content, Info } from './styles';
import SignIn from './SignIn';

function Landing() {
  const [loginSelected, setLoginSelected] = useState(true);

  return (
    <Container>
      <InitialMenu active="initial" />
      <Content>
        <Info>
          <h3>Aprenda em menos de 5 minutos.</h3>
          <h2>
            Decida você mesmo quais conteúdos assistir e trilhe seu próprio
            caminho nos estudos.
          </h2>
          <Button
            type="secondary"
            onClick={() => setLoginSelected(!loginSelected)}
          >
            {loginSelected ? 'QUERO ME CADASTRAR' : 'QUERO ENTRAR'}
          </Button>
        </Info>
        {loginSelected ? <SignIn /> : <SignUp />}
      </Content>
    </Container>
  );
}

export default Landing;
