import React from 'react';
import { InitialMenu, SignUp } from '~/components';

import flowActions from '~/assets/flowActions.png';

import { Container, SignUpContainer, Info } from './styles';

function Learn() {
  return (
    <Container>
      <div>
        <InitialMenu active="learn" />
        <Info>
          <h3>Assista a videoaulas interativas.</h3>
          <p>Após assistir um video, você verá uma tela com dois botões.</p>
          <img
            src={flowActions}
            alt="Imagem com dois botões de decidir sobre o fluxo da videoaula."
          />
          <p>
            Se você entender o conteúdo do vídeo pode prosseguir com o conteúdo.
          </p>
          <p>
            Se você não entender ou sentir que ainda não aprendeu muito bem,
            você pode ver mais sobre o mesmo conteúdo de uma forma diferente.
          </p>
          <h5>Principais vantagens</h5>
          <p>1. Cada vídeo tem em média 1 minuto de duração.</p>
          <p>
            2. A maioria dos vídeos tem outros elementos visuais além do texto.
          </p>
        </Info>
      </div>
      <SignUpContainer>
        <SignUp />
      </SignUpContainer>
    </Container>
  );
}

export default Learn;
