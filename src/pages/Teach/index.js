import React from 'react';
import { InitialMenu, SignUp } from '~/components';

import { Container, SignUpContainer, Info } from './styles';

function Teach() {
  return (
    <Container>
      <div>
        <InitialMenu active="teach" />
        <Info>
          <h3>Ensine em videoaulas interativas.</h3>
          <h4>Como funciona?</h4>
          <div>
            <p>
              O aluno assiste a uma videoaula, se ele entender o conteudo, pode
              prosseguir com o conteúdo.
            </p>
            <p>
              Se ele não entender ou sentir que ainda não aprendeu muito bem,
              ele pode ver mais sobre o mesmo conteúdo de uma forma diferente.
            </p>
          </div>
          <h4>Como ser um colaborador?</h4>
          <div>
            <p>Ao fazer seu cadastro, entre em “minha conta” no menu.</p>
            <p>
              Na área de professor, clique em mudar de perfil. Preencha as
              informações extras e sua solicitação será enviada.
            </p>
            <p>
              Após um análise, você receberá um email informando sua aprovação e
              logo poderá criar plano de aula com videoaulas interativas.
            </p>
          </div>
        </Info>
      </div>
      <SignUpContainer>
        <SignUp />
      </SignUpContainer>
    </Container>
  );
}

export default Teach;
