import React, { useState, useEffect, useMemo } from 'react';
import { uniqueId } from 'lodash';

import Menu from '../../components/Menu';
import Upload from '~/components/Upload';
import api from '~/services/api';
import { Container, Header } from './styles';

export default function Videos() {
  let arrayVid = [[addNewTemplate()], [], []];

  const [telaSm, setTelaSm] = useState(window.innerWidth < 575 && true);
  const [progresso, setProgresso] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState(arrayVid);

  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth < 575) {
        setTelaSm(true);
        return true;
      }
      setTelaSm(false);
      return false;
    },
    false
  );

  function addNewTemplate() {
    const newTemplate = {
      id: uniqueId(),
      nome: '',
      progresso: 0,
      uploaded: false,
      error: false,
    };
    return newTemplate;
  }

  function handleFile(file, coluna, linha) {
    const dados = new FormData();
    dados.append('videoFile', file[0]);

    api
      .post('/videos', dados, {
        onUploadProgress: ev => {
          // eslint-disable-next-line radix
          const progress = parseInt(Math.round((ev.loaded * 100) / ev.total));
          setProgresso(progress);
          arrayVid = videos;
          arrayVid[coluna][linha].progresso = progress;
          setVideos(arrayVid);
        },
      })
      .then(success => {
        arrayVid = videos;
        arrayVid[coluna][linha].uploaded = true;
        arrayVid[coluna][linha].error = false;
        arrayVid[coluna][linha].data = success.data;

        if (coluna < 2) {
          arrayVid[coluna + 1][linha] = addNewTemplate();
        }
        if (linha < 3 && coluna == 0) {
          arrayVid[coluna][linha + 1] = addNewTemplate();
        }
        setVideos(arrayVid);
        setVideo(success.data);
        // setUploaded(true);
        // setError(false);
        // setVideo(success.data);

        console.log(videos);
      })
      .catch(fail => {
        arrayVid = videos;
        arrayVid[coluna][linha].error = true;
        setVideos(arrayVid);
        setError(true); // retirar

        console.log(fail);
      });
  }

  return (
    <>
      <Menu />
      <div className="container mt-4">
        <Header>
          <h1>Gerenciar Vídeos</h1>
          <div className="ml-auto">
            <button
              type="submit"
              className={`btn btn-light m-0 ${telaSm ? 'btn-sm' : 'btn-lg'}`}
            >
              Concluir
            </button>
          </div>
        </Header>
        <hr className="dropdown-divider mb-3" />

        {videos.map((nivel, coluna) => (
          <Container key={uniqueId()}>
            {nivel.map((vid, linha) => (
              <Upload
                key={vid.id}
                nome={vid.nome}
                progresso={vid.progresso}
                error={vid.error}
                uploaded={vid.uploaded}
                handleFile={file => handleFile(file, coluna, linha)}
              />
            ))}
          </Container>
        ))}
      </div>
    </>
  );
}
