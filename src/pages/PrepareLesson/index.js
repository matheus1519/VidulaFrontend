/* eslint-disable radix */
import React, { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { toast, Zoom } from 'react-toastify';
import { Button, MainLayout, Upload } from '~/components';
import history from '~/services/history';

import { Header, Divider, UploadContainer } from './styles';
import api from '~/services/api';
import { VideoDTO } from '~/util/video/VideoDTO';

function PrepareLesson() {
  const arrayVideo = [[], [], []];

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
    <MainLayout>
      <Header>
        <h1>Insira os vídeos</h1>
        <div>
          <Button type="secondary" onClick={() => {}}>
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
              />
            )
          )
        )}
      </UploadContainer>
    </MainLayout>
  );
}

export default PrepareLesson;
