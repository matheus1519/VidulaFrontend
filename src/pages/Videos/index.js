/* eslint-disable no-plusplus */
import React, { useState } from 'react';

import { uniqueId } from 'lodash';
import { toast, Zoom } from 'react-toastify';

import api from '~/services/api';

export default function Videos() {
  let arrayVid = [[], [], []];

  function addNewTemplate() {
    return {
      id: uniqueId(),
      nome: '',
      progresso: 0,
      uploaded: false,
      error: false,
    };
  }

  function inicializaArray() {
    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 4; coluna++) {
        arrayVid[linha][coluna] = {};
      }
    }
    arrayVid[0][0] = addNewTemplate();
  }
  inicializaArray();

  // const [telaSm, setTelaSm] = useState(window.innerWidth < 575 && true);
  const [videos, setVideos] = useState(arrayVid);
  const [disciplina, setDisciplina] = useState('');
  const [objDisciplina, setObjDisciplina] = useState({});
  const [descricao, setDescricao] = useState('');
  const [descricaoVisible, setDescricaoVisible] = useState(false);

  const [assunto, setAssunto] = useState('');

  // window.addEventListener(
  //   'resize',
  //   () => {
  //     if (window.innerWidth < 575) {
  //       setTelaSm(true);
  //       return true;
  //     }
  //     setTelaSm(false);
  //     return false;
  //   },
  //   false
  // );

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
          setVideos([...arrayVid]);
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
      });
  }

  function handleAvancar() {
    let campoNome = 0;
    let interativo = false;

    videos.forEach(nivel => {
      nivel.forEach(video => {
        if (typeof video.id === 'number' && video.nome === '') {
          campoNome++;
        }
      });
    });

    if (campoNome > 0) {
      toast.error(`Faltam ${campoNome} a ser preenchido!`, {
        transition: Zoom,
      });
      return;
    }

    arrayVid = videos;

    interativo = arrayVid[1].some(
      vid => Object.values(vid).length > 0 && typeof vid.id !== 'string'
    );

    if (!interativo) {
      toast.error(`Não há como aplicar interatividade no plano de aula atual`, {
        transition: Zoom,
      });
      return;
    }

    arrayVid.forEach((nivel, linha) => {
      nivel.forEach((video, coluna) => {
        if (typeof video.id === 'number') {
          try {
            api.put(`/videos/${video.id}`, {
              id: video.id,
              nome: video.nome,
              url: video.data.url,
              proximo:
                coluna < 3 && typeof arrayVid[0][coluna + 1].id === 'number'
                  ? { id: arrayVid[0][coluna + 1].id }
                  : null,
              detalhe:
                linha < 2 && typeof arrayVid[linha + 1][coluna].id === 'number'
                  ? { id: arrayVid[linha + 1][coluna].id }
                  : null,
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    });
  }

  function handleConcluir() {
    try {
      api.post('assuntos', {
        nome: assunto,
        inicio: { id: videos[0][0].id },
        disciplina: { id: disciplina.id },
      });
    } catch (err) {
      console.log(err);
    }

    // history.push('principal');
    toast.success('Plano de aula criado com sucesso!', {
      transition: Zoom,
    });
  }

  async function handleAddDisciplina(e) {
    const elemento = e.target;
    setDescricaoVisible(true);
    const response = await api.post('disciplinas', { nome: disciplina });
    setObjDisciplina(response.data);
    // loadDisciplinas();
    elemento.blur();
  }

  async function handleUpdateDisciplina() {
    if (descricaoVisible) {
      await api.put(`disciplinas/${objDisciplina.id}`, {
        ...objDisciplina,
        descricao,
      });
    }
  }
}
