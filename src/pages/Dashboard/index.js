/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Menu from '~/components/Menu';
import Modal from '~/components/Modal';
import {
  ContainerMaior,
  ContainerVidList,
  Video,
  ListVideos,
  DisciplinaList,
  Header,
  ButtonGroup,
} from './estilos';
import api from '~/services/api';

export default function Dashboard() {
  const [disciplinas, setDisciplinas] = useState([]);
  const dis = localStorage.getItem('disciplina');
  const [disciplina, setDisciplina] = useState(JSON.parse(dis) || {});
  const [assunto, setAssunto] = useState(
    disciplina.assuntos ? disciplina.assuntos[0] : {}
  );
  const [video, setVideo] = useState(assunto.inicio);
  const [visible, setVisible] = useState(!dis);
  const [endedOfVideo, setEndedOfVideo] = useState(false);


  useEffect(() => {
    async function loadDisciplinas() {
      try {
        const response = await api.get('disciplinas');
        setDisciplinas(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadDisciplinas();
  }, []);



  function handleButtonDetail() {
    setVideo(video.detalhe);
    document.querySelector('video').load();
    setEndedOfVideo(false);
  }

  function handleProximo() {
    setVideo(video.proximo);

    document.querySelector('video').load();

    setEndedOfVideo(false);
  }

  function handleTerminar() {
    disciplina.assuntos.forEach(assuntoArray => {
      if (assuntoArray.id === assunto.id) {
        const posicao = disciplina.assuntos.indexOf(assunto);
        if (posicao < disciplina.assuntos.length - 1) {
          setVideo(disciplina.assuntos[posicao + 1].inicio);
          setEndedOfVideo(false);
          document.querySelector('video').load();
        }
      } else {
        console.log('fsdfsd');
      }
    });
  }

  function handleDecisions() {
    if (video.detalhe === null && video.proximo !== null) {
      handleProximo();
    } else if (video.detalhe === null && video.proximo === null) {
      handleTerminar();
    }
  }

  return (
    <>
      {visible && (
        <Modal closeable={disciplinas.length === 0}>
          <h2 className="mb-4">
            {disciplinas.length === 0
              ? 'Não existe disciplinas!'
              : 'Seleciona a Disciplina'}
          </h2>
          <DisciplinaList>
            {disciplinas.map(disc => (
              <li
                onClick={() => {
                  setDisciplina(disc);
                  setAssunto(disc.assuntos[0]);
                  setVideo(disc.assuntos[0].inicio);
                  setEndedOfVideo(false);
                  document.querySelector('video').load();

                  localStorage.setItem('disciplina', JSON.stringify(disc));
                  setVisible(false);
                }}
              >
                <h5>{disc.nome}</h5>
                <p>{disc.descricao}</p>
              </li>
            ))}
          </DisciplinaList>
        </Modal>
      )}
      <ContainerMaior>
        <Menu />
        <div className="container mt-4">
          <Header>
            <h1>{disciplina.nome || 'Nenhuma disciplina selecionada'}</h1>
            <button
              type="submit"
              className="btn btn-light btn-lg m-0"
              onClick={() => setVisible(true)}
            >
              Mudar
            </button>
          </Header>
          <hr className="dropdown-divider mb-4" />
          <h4>{video ? video.nome : 'Sem nome'}</h4>
          <ContainerVidList>
            <Video>
              <video
                onEnded={() => {
                  setEndedOfVideo(true);
                }}
                controls
                autoPlay
                preload="auto"
              >
                <source src={video && video.url} type="video/mp4" />
                <track
                  src="captions_pt.vtt"
                  kind="captions"
                  srcLang="pt"
                  label="portuguese_captions"
                />
                {/* olhar mais sobre a tag track */}
                Seu navegador está desatualizado e não suporta a visualização de
                videos!
              </video>

              {endedOfVideo && (
                <ButtonGroup>
                  {video.proximo === null && (
                    <button
                      onClick={handleTerminar}
                      type="button"
                      className="btn btn-block btn-warning btn-lg"
                    >
                      Entendi, terminar assunto!
                    </button>
                  )}
                  {!!video.proximo && (
                    <button
                      onClick={handleProximo}
                      type="button"
                      className="btn btn-block btn-warning btn-lg"
                    >
                      Entendi, prosseguir com conteúdo
                    </button>
                  )}
                  {handleDecisions()}
                  {video.detalhe && (
                    <button
                      onClick={handleButtonDetail}
                      type="button"
                      className="btn btn-block btn-outline-warning"
                    >
                      Preciso de mais detalhes
                    </button>
                  )}
                </ButtonGroup>
              )}
            </Video>
            <ListVideos>
              <h4>Assuntos</h4>
              <ul>
                {disciplina.assuntos ? (
                  disciplina.assuntos.map(as => (
                    <li
                      key={as.id}
                      onClick={() => {
                        setVideo(as.inicio);
                        document.querySelector('video').load();
                        setAssunto(as);
                        setEndedOfVideo(false);
                      }}
                    >
                      {as.nome}
                    </li>
                  ))
                ) : (
                  <h6>Não há assuntos disponíveis</h6>
                )}
              </ul>
            </ListVideos>
          </ContainerVidList>
        </div>
      </ContainerMaior>
    </>
  );
}
