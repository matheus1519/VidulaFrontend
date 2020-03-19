/* eslint-disable no-plusplus */
import React, { useState, useEffect, useMemo } from 'react';
import { uniqueId } from 'lodash';

import Menu from '../../components/Menu';
import Upload from '~/components/Upload';
import api from '~/services/api';
import { Container, Header } from './styles';

export default function Videos() {
  let arrayVid = [[], [], []];

  function inicializaArray() {
    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 4; coluna++) {
        arrayVid[linha][coluna] = {};
      }
    }
  }
  inicializaArray();
  arrayVid[0][0] = addNewTemplate();

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

  function handleFile(file, linha, coluna) {
    const dados = new FormData();
    dados.append('videoFile', file[0]);

    api
      .post('/videos', dados, {
        onUploadProgress: ev => {
          // eslint-disable-next-line radix
          const progress = parseInt(Math.round((ev.loaded * 100) / ev.total));
          arrayVid = videos;
          arrayVid[linha][coluna].progresso = progress;
          setProgresso(progress);
          // setVideos([
          //   arrayVid.map((nivel, lin) => [
          //     nivel.map((vid, col) =>
          //       linha === lin && coluna === col
          //         ? {
          //             progresso: progress,
          //           }
          //         : vid
          //     ),
          //   ]),
          // ]);
        },
      })
      .then(success => {
        arrayVid = videos;
        arrayVid[linha][coluna].uploaded = true;
        arrayVid[linha][coluna].error = false;
        arrayVid[linha][coluna].id = success.data.id;
        arrayVid[linha][coluna].data = success.data;

        if (linha < 2) {
          arrayVid[linha + 1][coluna] = addNewTemplate();
        }
        if (coluna < 3 && linha == 0) {
          arrayVid[linha][coluna + 1] = addNewTemplate();
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
        arrayVid[linha][coluna].error = true;
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
        {videos.map((nivel, linha) => (
          <Container key={uniqueId()}>
            {nivel.map((vid, coluna) =>
              vid.valueOf().id === undefined ? (
                <div />
              ) : (
                <Upload
                  key={vid.id}
                  nome={vid.nome}
                  progresso={vid.progresso}
                  error={vid.error}
                  uploaded={vid.uploaded}
                  handleFile={file => handleFile(file, linha, coluna)}
                />
              )
            )}
          </Container>
        ))}
      </div>
    </>
  );
}
