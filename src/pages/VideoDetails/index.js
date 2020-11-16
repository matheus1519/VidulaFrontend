import React, { useState } from 'react';
import { RadioGroup, TextField } from '@material-ui/core';
import { SiGoogleclassroom } from 'react-icons/si';
import { Autocomplete } from '@material-ui/lab';
import { Button, Input, MainLayout, Modal, TextArea } from '~/components';

import VideoDetail from './VideoDetail';

import {
  ModalContent,
  Footer,
  StyledRadioText,
  ModalContentAboutLesson,
  Container,
  Header,
  Divider,
} from './styles';
import RadioButton from '~/styles/RadioButton';

function VideoDetails() {
  const [insertDetail, setInsertDetail] = useState(false);
  const [aboutLesson, setAboutLesson] = useState(true);
  const [rightAlternative, setRightAlternative] = useState('alternative1');
  const [listSubjects, setListSubjects] = useState([
    {
      id: 1,
      nome: 'Linguagem C',
      descricao:
        'Linguagem C é uma linguagem de programação ideal para aprender as técnicas de programação. ',
    },
  ]);

  return (
    <>
      {insertDetail && (
        <Modal title="Insira detalhes do vídeo" onClose={setInsertDetail}>
          <ModalContent>
            <div>
              <h4>Dê um nome para o vídeo</h4>
              <Input name="name" placeholder="Nome" />
              <h4>Faça uma pergunta objetiva sobre o conteúdo do vídeo</h4>
              <TextArea placeholder="Pergunta (não dê margem para ambiguidade)" />
            </div>
            <div>
              <h4>Escolhas as alternativas e indique a certa</h4>
              <RadioGroup
                aria-label="answer"
                name="answer"
                value={rightAlternative}
                onChange={(_, value) => setRightAlternative(value)}
              >
                <StyledRadioText>
                  <Input name="alternative1" placeholder="Alternativa 1" />
                  <RadioButton
                    value="alternative1"
                    checked={rightAlternative === 'alternative1'}
                  />
                </StyledRadioText>
                <StyledRadioText>
                  <Input name="alternative2" placeholder="Alternativa 2" />
                  <RadioButton
                    value="alternative2"
                    checked={rightAlternative === 'alternative2'}
                  />
                </StyledRadioText>
                <StyledRadioText>
                  <Input name="alternative3" placeholder="Alternativa 3" />
                  <RadioButton
                    value="alternative3"
                    checked={rightAlternative === 'alternative3'}
                  />
                </StyledRadioText>
                <StyledRadioText>
                  <Input name="alternative4" placeholder="Alternativa 4" />
                  <RadioButton
                    value="alternative4"
                    checked={rightAlternative === 'alternative4'}
                  />
                </StyledRadioText>
                <StyledRadioText>
                  <Input name="alternative5" placeholder="Alternativa 5" />
                  <RadioButton
                    value="alternative5"
                    checked={rightAlternative === 'alternative5'}
                  />
                </StyledRadioText>
              </RadioGroup>
            </div>
          </ModalContent>
          <Footer>
            <Button onClick={() => {}}>Continuar</Button>
          </Footer>
        </Modal>
      )}
      {aboutLesson && (
        <Modal title="Sobre a aula" onClose={setAboutLesson}>
          <ModalContentAboutLesson>
            <h4>Como se chama o assunto mostrado na aula?</h4>
            <Input
              icon={SiGoogleclassroom}
              name="name"
              placeholder="Nome da aula"
            />
            <h4>Selecione a disciplina na qual o assunto está inserido</h4>
            <span>
              <Autocomplete
                blurOnSelect
                id="combo-box-demo"
                noOptionsText="Nenhuma disciplina encontrada"
                options={listSubjects}
                getOptionLabel={option => option.nome}
                // onChange={(e, value) => {
                //   setDisciplina(value);
                // }}
                // style={{
                //   maxWidth: 300,
                // }}
                renderInput={params => (
                  <TextField
                    // onChange={event => {
                    //   setDisciplina(event.target.value);
                    // }}
                    // value={disciplina}
                    {...params}
                    label="Selecione a disciplina"
                    variant="outlined"
                  />
                )}
              />
            </span>
          </ModalContentAboutLesson>
          <Footer>
            <Button onClick={() => {}}>Concluir</Button>
          </Footer>
        </Modal>
      )}

      <MainLayout>
        <Header>
          <h1>Dê detalhes dos vídeos</h1>
          <Button onClick={() => setAboutLesson(true)}>Continuar</Button>
        </Header>
        <Divider />
        <Container>
          <VideoDetail onClick={() => setInsertDetail(true)} />
          <VideoDetail onClick={() => setInsertDetail(true)} filled />
          <VideoDetail onClick={() => setInsertDetail(true)} filled />
          <VideoDetail onClick={() => setInsertDetail(true)} />
          <VideoDetail onClick={() => setInsertDetail(true)} />
          <VideoDetail onClick={() => setInsertDetail(true)} filled />
          <VideoDetail onClick={() => setInsertDetail(true)} />
          <VideoDetail onClick={() => setInsertDetail(true)} filled />
          <VideoDetail onClick={() => setInsertDetail(true)} filled />
        </Container>
      </MainLayout>
    </>
  );
}

export default VideoDetails;
