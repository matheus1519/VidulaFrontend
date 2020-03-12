import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';

import Menu from '../../components/Menu';
import Upload from '~/components/Upload';
import api from '~/services/api';
import { Container, Header } from './styles';

export default function Videos() {
  const [progresso, setProgresso] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState([
    [
      {
        progresso: 0,
        uploaded: false,
        error: false,
      },
    ],
    [],
    [],
  ]);

  function addNewTemplate() {
    const newTemplate = {
      progresso: 0,
      uploaded: false,
      error: false,
    };
    return newTemplate;
  }

  function handleFile(file, linha, coluna) {
    const dados = new FormData();
    dados.append('videoFile', file[0]);

    api
      .post('/videos', dados, {
        onUploadProgress: ev => {
          // eslint-disable-next-line radix
          const progress = parseInt(Math.round((ev.loaded * 100) / ev.total));
          setProgresso(progress);
        },
      })
      .then(success => {
        setUploaded(true);
        setError(false);
        setVideo(success.data);
        setVideos(
          videos.map((nivel, col) =>
            nivel.map((vid, lin) =>
              lin === 0 && col === 0 ? vid : vid.progresso
            )
          )
        );
        console.log(success);
        console.log(videos);
      })
      .catch(fail => {
        setError(true);
        console.log(fail);
      });
  }

  return (
    <>
      <Menu />
      <div className="container mt-4">
        <Header>
          <h1>Gerenciar Vídeos</h1>
          <button
            type="submit"
            className="d-flex ml-auto btn btn-light btn-lg m-0"
          >
            Concluir
          </button>
        </Header>
        <hr className="dropdown-divider mb-3" />

        {/* <Upload
            progresso={progresso}
            error={error}
            uploaded={uploaded}
            handleFile={handleFile}
            disabled
          /> */}
        {videos.map((nivel, linha) => (
          <Container>
            {nivel.map((vid, coluna) => (
              <Upload
                progresso={vid.progresso}
                error={vid.error}
                uploaded={vid.uploaded}
                handleFile={file => handleFile(file, linha, coluna)}
                disabled
              />
            ))}
          </Container>
        ))}
      </div>
    </>
  );
}
