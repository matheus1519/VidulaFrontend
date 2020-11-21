/* eslint-disable radix */
import React, { useCallback, useState } from 'react';
import { uniqueId } from 'lodash';

import { toast, Zoom } from 'react-toastify';
import { Button, MainLayout, Upload } from '~/components';
import history from '~/services/history';

import { Header, Divider, UploadContainer } from './styles';
import api from '~/services/api';
import { VideoDTO } from '~/util/video/VideoDTO';

function PrepareLesson() {
  let arrayVideo = [[], [], []];

  function addNewTemplate() {
    return {
      id: uniqueId(),
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

  const handleUploaded = useCallback((file, line, column) => {
    const formVideo = new FormData();
    formVideo.append('videoFile', file);

    api
      .post('/videos/send', formVideo, {
        onUploadProgress: ev => {
          const progress = parseInt(Math.round((ev.loaded * 100) / ev.total));
          arrayVideo = videos;
          arrayVideo[line][column].progress = progress;
          setVideos([...arrayVideo]);
        },
      })
      .then(success => {
        arrayVideo = videos;
        arrayVideo[line][column].name = file.name;
        arrayVideo[line][column].uploaded = true;
        arrayVideo[line][column].error = false;
        arrayVideo[line][column].id = success.data.id;
        arrayVideo[line][column].url = success.data.url;

        if (line < 2) {
          arrayVideo[line + 1][column] = addNewTemplate();
        }
        if (column < 3 && line === 0) {
          arrayVideo[line][column + 1] = addNewTemplate();
        }
        setVideos([...arrayVideo]);
      })
      .catch(fail => {
        arrayVideo = videos;
        arrayVideo[line][column].error = true;
        setVideos([...arrayVideo]);

        console.log('sem conexão com o servidor!');
      });
  }, []);

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
  }, []);

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
