import React from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';

import avatarAnony from '~/assets/avatar-anony.png';

import { Button, ButtonLink, Icon, TextArea, Avatar } from '~/components';

import { Container, Doubt, DoubtBody, TakeDoubt } from './styles';

function Doubts() {
  return (
    <Container>
      <h3>59 Dúvidas</h3>
      <Doubt>
        <Avatar url={avatarAnony} alt="Juliana Mattos" />
        <div>
          <h6>Juliana Mattos</h6>
          <DoubtBody>
            <p>
              Não entendi a parte da comparação, quais sinais devo usar para
              conseguir gerar um resultado ideal para uma conta dessas?
            </p>
            <ButtonLink>Responder</ButtonLink>
            {/* <div>
        <Icon size={24} icon={AiOutlineLike} />
      </div> */}
          </DoubtBody>
          <ButtonLink icon={FaChevronUp} mt="8">
            Ocultar 1 resposta
          </ButtonLink>
          <Doubt>
            <Avatar url={avatarAnony} alt="Alex Santos" />
            <div>
              <h6>
                Henrique de Carvalho<small>PROFESSOR</small>
              </h6>
              <DoubtBody teacher>
                <p>
                  Dessa forma não temos como mensaurar o ganho ao utilizar essa
                  forma.
                </p>
              </DoubtBody>
            </div>
          </Doubt>
        </div>
      </Doubt>
      <Doubt>
        <Avatar url={avatarAnony} alt="Alex Santos" />
        <div>
          <h6>Alex Santos </h6>
          <DoubtBody>
            <p>
              Porque não usar a forma descriva ao invés da comparativa? Seria
              melhor encaixada.
            </p>
            {/* <ButtonLink>Responder</ButtonLink> */}
            <div>
              <Icon size={24} icon={AiOutlineLike} />
            </div>
          </DoubtBody>
        </div>
      </Doubt>
      <TakeDoubt>
        <Avatar url={avatarAnony} alt="Usuário Atual" />
        <div>
          <TextArea placeholder="Tire sua dúvida" />
          <Button>Enviar</Button>
        </div>
      </TakeDoubt>
    </Container>
  );
}

export default Doubts;
