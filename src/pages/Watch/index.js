import React from 'react';

import { Button, ButtonLink, MainLayout } from '~/components';

import videoTest from '~/assets/video-test.mp4';
import avatarAnony from '~/assets/avatar-anony.png';

import {
  Header,
  Divider,
  Subject,
  Content,
  MainContent,
  Video,
  Teacher,
  Avatar,
  Doubts,
  Doubt,
  DoubtBody,
  Subjects,
} from './styles';

import { useTheme } from '~/context/Theme';

function Watch() {
  const { theme } = useTheme();

  return (
    <MainLayout>
      <Header>
        <h1>Linguagem C</h1>
        <Button type="secondary">Trocar Disciplina</Button>
      </Header>
      <Divider />
      <Subject>Estrutura de decição simples</Subject>
      <Content>
        <MainContent>
          <Video>
            <video onEnded={() => {}} controls preload="auto">
              <source src={videoTest} type="video/mp4" />
              <track
                src="captions_pt.vtt"
                kind="captions"
                srcLang="pt"
                label="portuguese_captions"
              />
              Seu navegador está desatualizado e não suporta a visualização de
              videos!
            </video>
          </Video>
          <Teacher>
            <Avatar src={avatarAnony} />
            <div>
              <p>Henrique de Carvalho</p>
              <small>Professor de Matemática</small>
            </div>
          </Teacher>
          <Divider />
          <Doubts>
            <h3>59 Dúvidas</h3>
            <Doubt>
              <Avatar src={avatarAnony} alt="Juliana Mattos" />
              <div>
                <h6>Juliana Mattos</h6>
                <DoubtBody>
                  <p>
                    Não entendi a parte da comparação, quais sinais devo usar
                    para conseguir gerar um resultado ideal para uma conta
                    dessas?
                  </p>
                  <ButtonLink>Responder</ButtonLink>
                  {/* <FiThumbsUp color={theme.primary}/> */}
                </DoubtBody>
              </div>
            </Doubt>
          </Doubts>
        </MainContent>
        <Subjects>CardAssuntos</Subjects>
      </Content>
    </MainLayout>
  );
}

export default Watch;
