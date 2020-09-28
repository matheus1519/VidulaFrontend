/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { IoIosArrowBack, IoIosCloseCircle } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import { AiFillPlaySquare } from 'react-icons/ai';

import { uniqueId } from 'lodash';
import { toast, Zoom } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, darken } from '@material-ui/core/styles';

import Menu from '~/components/Menu';
import Upload from './Upload';
import api from '~/services/api';
import {
  Container,
  ContainerInput,
  Header,
  Modal,
  ContainerMaior,
  ModalTool,
} from './styles';
import history from '~/services/history';
import tccEsquema from '~/assets/tcc-esquema.svg';

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

  const [telaSm, setTelaSm] = useState(window.innerWidth < 575 && true);
  const [videos, setVideos] = useState(arrayVid);
  const [listaDisciplinas, setListaDisciplinas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const [disciplina, setDisciplina] = useState('');
  const [objDisciplina, setObjDisciplina] = useState({});
  const [descricao, setDescricao] = useState('');
  const [descricaoVisible, setDescricaoVisible] = useState(false);

  const [assunto, setAssunto] = useState('');
  const [step, setStep] = useState(1);

  async function loadDisciplinas() {
    const response = await api.get('disciplinas');
    setListaDisciplinas(response.data);
  }

  useEffect(() => {
    loadDisciplinas();
  }, [modalVisible]);

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

    setModalVisible(true);
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

    history.push('principal');
    toast.success('Plano de aula criado com sucesso!', {
      transition: Zoom,
    });
  }

  async function handleAddDisciplina(e) {
    const elemento = e.target;
    setDescricaoVisible(true);
    const response = await api.post('disciplinas', { nome: disciplina });
    setObjDisciplina(response.data);
    loadDisciplinas();
    elemento.blur();
  }

  async function handleUpdateDisciplina() {
    if (descricaoVisible) {
      await api.put(`disciplinas/${objDisciplina.id}`, {
        ...objDisciplina,
        descricao,
      });
    }
    setStep(2);
  }

  const useStyles = makeStyles({
    button: {
      fontSize: 13,
      width: '100%',
      textAlign: 'left',
      paddingBottom: 8,
      color: '#586069',
      fontWeight: 600,
      '&:hover,&:focus': {
        color: '#0366d6',
      },
      '& span': {
        width: '100%',
      },
      '& svg': {
        width: 16,
        height: 16,
      },
    },
    option: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      '&[aria-selected="true"]': {
        backgroundColor: darken('#ebf2ff', 0.1),
      },
      '&[data-focus="true"]': {
        backgroundColor: '#ebf2ff',
      },
      color: '#01103b',
    },
  });
  const classes = useStyles();

  return (
    <>
      {toolTip && (
        <ModalTool>
          <div>
            <h4>Esquema de organização dos videos interativos</h4>
            <img src={tccEsquema} alt="Esquema de Aulas interativas" />
            <IoIosCloseCircle
              onClick={() => {
                setToolTip(false);
              }}
              fill="#dc3545"
              size={60}
            />
            <div className="bac" />
          </div>
        </ModalTool>
      )}
      {modalVisible && (
        <Modal>
          {step === 1 && (
            <div>
              <h4>
                Informe em qual disciplina você quer inserir este assunto!
              </h4>
              <Autocomplete
                blurOnSelect
                classes={{
                  option: classes.option,
                  paper: classes.paper,
                }}
                id="controlled-demo"
                noOptionsText="Nenhuma disciplina encontrada"
                options={listaDisciplinas}
                getOptionLabel={option => listaDisciplinas && option.nome}
                onChange={(e, value) => {
                  setDisciplina(value);
                }}
                style={{
                  maxWidth: 300,
                }}
                renderInput={params => (
                  <TextField
                    onChange={event => {
                      setDisciplina(event.target.value);
                    }}
                    value={disciplina}
                    onKeyPress={e => {
                      if (e.which === 13) {
                        handleAddDisciplina(e);
                      }
                    }}
                    {...params}
                    label="Selecione uma disciplina"
                    margin="normal"
                  />
                )}
              />
              <button
                id="add"
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleAddDisciplina}
                onFocus={() => {}}
              >
                <MdAddCircleOutline fill="#6c757d" size={24} />
              </button>
              {descricaoVisible && (
                <TextField
                  id="standard-basic"
                  label="Descrição"
                  style={{ width: 558, marginTop: 20 }}
                  onChange={e => setDescricao(e.target.value)}
                  value={descricao}
                />
              )}
              <button
                type="button"
                className="btn btn-primary ml-auto d-flex mt-3"
                onClick={handleUpdateDisciplina}
              >
                Avançar
              </button>
            </div>
          )}
          {step !== 1 && (
            <div>
              <h4>Insira um nome correspondente ao assunto da aula</h4>
              <TextField
                id="standard-size-normal"
                label="Assunto"
                onChange={e => setAssunto(e.target.value)}
                value={assunto}
                style={{ marginTop: 10, width: 300 }}
              />
              <div id="step2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setStep(1);
                    localStorage.setItem('step', step);
                  }}
                >
                  <IoIosArrowBack
                    size={26}
                    style={{ marginTop: -5 }}
                    fill="#007bff"
                  />
                  Voltar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConcluir}
                >
                  <FaCheckCircle
                    style={{ marginTop: -5, marginRight: 5 }}
                    className="concluir"
                    size={26}
                  />
                  Concluir
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
      <ContainerMaior>
        <Menu />
        <div className="container mt-4">
          <Header>
            <div className="d-flex">
              <h1>Gerenciar Vídeos</h1>
              <AiFillPlaySquare
                onClick={() => {
                  setToolTip(true);
                }}
                size={48}
                className="ml-3"
              />
            </div>
            <div className="ml-auto">
              <button
                type="submit"
                className={`btn btn-light m-0 ${telaSm ? 'btn-sm' : 'btn-lg'}`}
                onClick={handleAvancar}
              >
                Avançar
              </button>
            </div>
          </Header>
          <hr className="dropdown-divider mb-3" />
          {videos.map((nivel, linha) => (
            <Container key={nivel}>
              {nivel.map((vid, coluna) =>
                vid.valueOf().id === undefined ? (
                  <div />
                ) : (
                  <ContainerInput key={vid.id}>
                    <input
                      type="text"
                      placeholder="Nome"
                      onChange={e => {
                        arrayVid = videos;
                        arrayVid[linha][coluna].nome = e.target.value;
                        setVideos(arrayVid);
                        console.log(videos);
                      }}
                      // value={handleNameValue(linha, coluna)}
                      // value={videos[linha][coluna].nome}
                    />
                    <Upload
                      key={vid.id}
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
      </ContainerMaior>
    </>
  );
}
