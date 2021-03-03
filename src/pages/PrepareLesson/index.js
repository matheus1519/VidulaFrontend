/* eslint-disable radix */
import React, { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { toast, Zoom } from 'react-toastify';
import { Button, MainLayout, Upload, Modal } from '~/components';
import history from '~/services/history';

import esquemaEstruturado from '~/assets/EsquemaEstruturadoV2.svg';
import { ModalContent, Header, Divider, UploadContainer } from './styles';
import api from '~/services/api';
import { VideoDTO } from '~/util/video/VideoDTO';

function PrepareLesson() {
  const arrayVideo = [[], [], []];
  const [needHelp, setNeedHelp] = useState(false);

  function addNewTemplate() {
    return {
      id: uuid(),
      name: '',
      progress: 0,
      uploaded: false,
      error: false,
    };
  }

  for (let line = 0; line < 3; line += 1) {
    for (let column = 0; column < 4; column += 1) {
      arrayVideo[line][column] = {};
    }
  }
  arrayVideo[0][0] = addNewTemplate();

  const [videos, setVideos] = useState(arrayVideo);

  const handleUploaded = useCallback(
    (file, line, column) => {
      let arrayVid = [[], [], []];
      const formVideo = new FormData();
      formVideo.append('videoFile', file);

      api
        .post('/videos/send', formVideo, {
          onUploadProgress: ev => {
            const progress = parseInt(Math.round((ev.loaded * 100) / ev.total));
            arrayVid = videos;
            arrayVid[line][column].progress = progress;
            setVideos([...arrayVid]);
          },
        })
        .then(success => {
          arrayVid = videos;
          arrayVid[line][column].name = file.name;
          arrayVid[line][column].uploaded = true;
          arrayVid[line][column].error = false;
          arrayVid[line][column].id = success.data.id;
          arrayVid[line][column].url = success.data.url;

          if (line < 2) {
            arrayVid[line + 1][column] = addNewTemplate();
          }
          if (column < 3 && line === 0) {
            arrayVid[line][column + 1] = addNewTemplate();
          }
          setVideos([...arrayVid]);
        })
        .catch(fail => {
          arrayVid = videos;
          arrayVid[line][column].error = true;
          setVideos([...arrayVid]);

          console.log('sem conexão com o servidor!');
        });
    },
    [videos]
  );

  const handleNext = useCallback(() => {
    let interativo = false;

    interativo = videos[1].some(
      vid => Object.values(vid).length && typeof vid.id === 'number'
    );

    if (!interativo) {
      toast.error(`Não há como aplicar interatividade no plano de aula atual`, {
        transition: Zoom,
      });
      return;
    }

    history.push('/detalhes-dos-videos', VideoDTO(videos));
  }, [videos]);

  return (
    <>
      {needHelp && (
        <Modal
          title="Instruções para o planejamento de aula"
          onClose={setNeedHelp}
          width="65%"
        >
          <ModalContent>
            <p>
              1. Observe o esquema de aula generica abaixo e insira seus videos
              baseados no exemplo.
            </p>
            <div>
              <img
                src={esquemaEstruturado}
                alt="Esquema auxiliar para criação do plano de aula"
              />
            </div>
            <p>
              2. O Assunto representa uma videoaula tradicional. A linha logo
              abaixo do Assunto representa o Assunto divido em quatro partes. As
              linhas sucessivas representam detalhes do nível de cima em sua
              respectiva coluna.
            </p>
            <p>
              3. O aluno decide se quer prosseguir com o conteúdo. Ou quer ver
              mais de acordo com os níveis de detalhe que você irá colocar.
            </p>
            <p>
              4. É obrigatorio ter pelo menos uma videoaula do nivel 0 e uma
              videoaula do nível 1. Assim a aula é considerada interativa.
            </p>
          </ModalContent>
        </Modal>
      )}
      <MainLayout>
        <Header>
          <h1>Insira os vídeos</h1>
          <div>
            <Button type="secondary" onClick={() => setNeedHelp(true)}>
              Preciso de ajuda
            </Button>
            <Button onClick={handleNext}>Continuar</Button>
          </div>
        </Header>
        <Divider />
        <UploadContainer>
          {videos.map((nivel, row) =>
            nivel.map((vid, column) =>
              vid.valueOf().id === undefined ? (
                <div key={vid.id} />
              ) : (
                <Upload
                  key={vid.id}
                  progress={vid.progress}
                  error={vid.error}
                  uploaded={vid.uploaded}
                  onUpload={file => handleUploaded(file, row, column)}
                  disabled={vid.uploaded}
                />
              )
            )
          )}
        </UploadContainer>
      </MainLayout>
    </>
  );
}

export default PrepareLesson;
