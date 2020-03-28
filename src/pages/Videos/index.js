/* eslint-disable no-plusplus */
import React, { memo, useState, useEffect, useMemo } from 'react';
import { uniqueId } from 'lodash';

import Menu from '~/components/Menu';
import Upload from '~/components/Upload';
import api from '~/services/api';
import { Container, ContainerInput, Header } from './styles';

export default function Videos() {
  let arrayVid = [[], [], []];

  function inicializaArray() {
    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 4; coluna++) {
        arrayVid[linha][coluna] = {};
      }
    }
    arrayVid[0][0] = addNewTemplate();
  }
  inicializaArray();

  const [telaSm, setTelaSm] = useState(window.innerWidth < 575 && true);
  const [error, setError] = useState(false);
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
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZW1AZ21haWwuY29tIiwiZXhwIjoxNTg1NDMwNDQxLCJpYXQiOjE1ODU0MTI0NDF9.7FPNwY6cZ5LD3NKX813w2NK2HhVfFc8F8IR3eurkfL4OUz7ilVyn4qXivMkMse7AQrKfHBp2QMdFjjqA0SEjZA`,
        },
        onUploadProgress: ev => {
          // eslint-disable-next-line radix
          const progress = parseInt(Math.round((ev.loaded * 100) / ev.total));
          arrayVid = videos;
          arrayVid[linha][coluna].progresso = progress;
          setVideos([...arrayVid]);
          // setVideos(
          //   videos.map((nivel, li) =>
          //     nivel.map((vid, co) =>
          //       li === linha && co === coluna
          //         ? { ...vid, progresso: progress }
          //         : vid
          //     )
          //   )
          // );
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
        if (coluna < 3 && linha === 0) {
          arrayVid[linha][coluna + 1] = addNewTemplate();
        }
        setVideos([...arrayVid]);
      })
      .catch(fail => {
        arrayVid = videos;
        arrayVid[linha][coluna].error = true;
        setVideos(arrayVid);

        console.log(fail);
        console.log(videos);
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
                <ContainerInput>
                  <input
                    type="text"
                    placeholder="Nome"
                    onChange={e => {
                      arrayVid = videos;
                      arrayVid[linha][coluna].nome = e.target.value;
                      setVideos(arrayVid);
                    }}
                    // value={vid.nome}
                  />
                  <Upload
                    key={vid.id}
                    nome={vid.nome}
                    progresso={vid.progresso}
                    error={vid.error}
                    uploaded={vid.uploaded}
                    handleFile={file => handleFile(file, linha, coluna)}
                  />
                </ContainerInput>
              )
            )}
          </Container>
        ))}
      </div>
    </>
  );
}
