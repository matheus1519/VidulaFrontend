import React, { useCallback, useEffect, useState } from 'react';
import { RadioGroup, TextField } from '@material-ui/core';
import { SiGoogleclassroom } from 'react-icons/si';
import { Autocomplete } from '@material-ui/lab';
import { toast, Zoom } from 'react-toastify';
import { Button, Input, MainLayout, Modal, TextArea } from '~/components';
import { hasEmptyFields } from '~/util/video/hasEmptyFields';

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
import history from '~/services/history';
import api from '~/services/api';
import { isEmpty } from '~/util/isObjectEmpty';

function VideoDetails({ location }) {
  if (!location.state) {
    history.push('/preparar-aula');
  }

  let arrayVideo;
  const [videos, setVideos] = useState(location.state);
  const [videoSelected, setVideoSelected] = useState({});
  const [insertDetail, setInsertDetail] = useState(false);
  const [aboutLesson, setAboutLesson] = useState(false);
  const [disciplineSelected, setDisciplineSelected] = useState({});
  const [listSubjects, setListSubjects] = useState([]);

  useEffect(() => {
    api.get('/disciplinas').then(response => setListSubjects(response.data));
  }, []);

  const handleModalDetail = useCallback((row, column) => {
    setInsertDetail(true);
    setVideoSelected({ ...videos[row][column], row, column });
  }, []);

  const handleDataDetail = useCallback((dataUnform, dataVideo) => {
    arrayVideo = videos;
    arrayVideo[dataVideo.row][dataVideo.column] = {
      name: dataUnform.name,
      id: dataVideo.id,
      url: dataVideo.url,
      alternatives: {
        question: dataVideo.alternatives.question,
        alternative1: dataUnform.alternative1,
        alternative2: dataUnform.alternative2,
        alternative3: dataUnform.alternative3,
        alternative4: dataUnform.alternative4,
        alternative5: dataUnform.alternative5,
        rightAlternative: dataVideo.alternatives.rightAlternative,
      },
    };

    if (hasEmptyFields(arrayVideo[dataVideo.row][dataVideo.column])) {
      arrayVideo[dataVideo.row][dataVideo.column].filled = false;
    } else {
      arrayVideo[dataVideo.row][dataVideo.column].filled = true;
    }

    setVideos([...arrayVideo]);

    setInsertDetail(false);
  }, []);

  const handleFinishSettings = useCallback(() => {
    arrayVideo = videos;
    let hasEmpty = false;

    videos.forEach(niv =>
      niv.forEach(vid => {
        if (vid.id && !vid.filled) {
          hasEmpty = true;
        }
      })
    );

    if (hasEmpty) {
      toast.error(`Preencha todas as informações`, {
        transition: Zoom,
      });
      return;
    }

    setAboutLesson(true);
  }, []);

  const handleConclude = useCallback(async (data, disciplineId) => {
    videos.forEach((nivel, row) => {
      nivel.forEach(async (video, column) => {
        if (!isEmpty(video)) {
          try {
            const response = await api.post('/testes', {
              pergunta: video.alternatives.question,
              alternativa1: video.alternatives.alternative1,
              alternativa2: video.alternatives.alternative2,
              alternativa3: video.alternatives.alternative3,
              alternativa4: video.alternatives.alternative4,
              alternativa5: video.alternatives.alternative5,
              alternativaCerta: video.alternatives.rightAlternative,
            });

            arrayVideo = videos;
            arrayVideo[row][column].teste = response.data.id;
            setVideos([...arrayVideo]);
          } catch (error) {
            console.log(error);
          }

          try {
            await api.put(`/videos/${video.id}`, {
              id: video.id,
              nome: video.name,
              url: video.url,
              teste: { id: video.teste },
              proximo:
                column < 3 && typeof arrayVideo[0][column + 1].id === 'number'
                  ? { id: arrayVideo[0][column + 1].id }
                  : null,
              detalhe:
                row < 2 && typeof arrayVideo[row + 1][column].id === 'number'
                  ? { id: arrayVideo[row + 1][column].id }
                  : null,
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    });

    try {
      await api.post('/assuntos', {
        nome: data.name,
        inicio: { id: videos[0][0].id },
        disciplina: { id: disciplineId },
      });

      toast.success('Plano de aula criado com sucesso!', {
        transition: Zoom,
      });
    } catch (err) {
      console.log(err);
      toast.error('Ocorreu um erro no servidor', {
        transition: Zoom,
      });
    }

    history.push('assistir');
  }, []);

  return (
    <>
      {insertDetail && (
        <Modal title="Insira detalhes do vídeo" onClose={setInsertDetail}>
          <ModalContent
            onSubmit={data => handleDataDetail(data, videoSelected)}
            initialData={{
              name: videoSelected.name,
              alternative1: videoSelected.alternatives.alternative1,
              alternative2: videoSelected.alternatives.alternative2,
              alternative3: videoSelected.alternatives.alternative3,
              alternative4: videoSelected.alternatives.alternative4,
              alternative5: videoSelected.alternatives.alternative5,
            }}
          >
            <div>
              <h4>Dê um nome para o vídeo</h4>
              <Input name="name" placeholder="Nome" />
              <h4>Faça uma pergunta objetiva sobre o conteúdo do vídeo</h4>
              <TextArea
                value={videoSelected.alternatives.question}
                onChange={e =>
                  setVideoSelected({
                    ...videoSelected,
                    alternatives: {
                      ...videoSelected.alternatives,
                      question: e.target.value,
                    },
                  })
                }
                placeholder="Pergunta (não dê margem para ambiguidade)"
              />
            </div>
            <div>
              <h4>Escolhas as alternativas e indique a certa</h4>
              <RadioGroup
                aria-label="answer"
                name="answer"
                value={videoSelected.alternatives.rightAlternative}
                onChange={(_, value) =>
                  setVideoSelected({
                    ...videoSelected,
                    alternatives: {
                      ...videoSelected.alternatives,
                      rightAlternative: value,
                    },
                  })
                }
              >
                <StyledRadioText>
                  <Input name="alternative1" placeholder="Alternativa 1" />
                  <RadioButton
                    value="alternative1"
                    checked={
                      videoSelected.alternatives.rightAlternative ===
                      'alternative1'
                    }
                  />
                </StyledRadioText>
                <StyledRadioText>
                  <Input name="alternative2" placeholder="Alternativa 2" />
                  <RadioButton
                    value="alternative2"
                    checked={
                      videoSelected.alternatives.rightAlternative ===
                      'alternative2'
                    }
                  />
                </StyledRadioText>
                <StyledRadioText>
                  <Input name="alternative3" placeholder="Alternativa 3" />
                  <RadioButton
                    value="alternative3"
                    checked={
                      videoSelected.alternatives.rightAlternative ===
                      'alternative3'
                    }
                  />
                </StyledRadioText>
                <StyledRadioText>
                  <Input name="alternative4" placeholder="Alternativa 4" />
                  <RadioButton
                    value="alternative4"
                    checked={
                      videoSelected.alternatives.rightAlternative ===
                      'alternative4'
                    }
                  />
                </StyledRadioText>
                <StyledRadioText>
                  <Input name="alternative5" placeholder="Alternativa 5" />
                  <RadioButton
                    value="alternative5"
                    checked={
                      videoSelected.alternatives.rightAlternative ===
                      'alternative5'
                    }
                  />
                </StyledRadioText>
              </RadioGroup>
            </div>
            <div />
            <Footer>
              <Button type="submit">Continuar</Button>
            </Footer>
          </ModalContent>
        </Modal>
      )}
      {aboutLesson && (
        <Modal title="Sobre a aula" onClose={setAboutLesson}>
          <ModalContentAboutLesson
            onSubmit={data => handleConclude(data, disciplineSelected.id)}
          >
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
                onChange={(e, value) => {
                  setDisciplineSelected(value);
                }}
                renderInput={params => (
                  <TextField
                    value={disciplineSelected}
                    {...params}
                    label="Selecione a disciplina"
                    variant="outlined"
                  />
                )}
              />
            </span>

            <Button type="submit">Concluir</Button>
          </ModalContentAboutLesson>
        </Modal>
      )}

      <MainLayout>
        <Header>
          <h1>Dê detalhes dos vídeos</h1>
          <Button onClick={handleFinishSettings}>Continuar</Button>
        </Header>
        <Divider />
        <Container>
          {videos.map((nivel, row) =>
            nivel.map((vid, column) =>
              vid.valueOf().id === undefined ? (
                <div />
              ) : (
                <VideoDetail
                  key={vid.id}
                  filled={vid.filled}
                  onClick={() => handleModalDetail(row, column)}
                />
              )
            )
          )}
        </Container>
      </MainLayout>
    </>
  );
}

export default VideoDetails;
