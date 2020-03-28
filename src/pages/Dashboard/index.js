import React, { useEffect } from 'react';
// import JwtDecode from 'jwt-decode';
import Menu from '~/components/Menu';
import { Container, Video, ListVideos } from './estilos';

export default function Dashboard() {
  const token = '';
  // useEffect(() => {
  //   const userId = localStorage.getItem('user');
  //   if (userId === null) {
  //     history.push('/entrar');
  //   }
  // }, []);

  return (
    <>
      <Menu />
      <Container className="container mt-4">
        <Video>
          <video controls>
            <source
              src="http://localhost:8080/videofile/1584995698656Upload de arquivos- front-end com ReactJS - Diego Fernandes.mp4"
              type="video/mp4"
            />
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

          <button type="button" className="btn btn-block btn-warning btn-lg">
            Entendi, prosseguir com conteúdo
          </button>
          <button type="button" className="btn btn-block btn-outline-warning">
            Preciso de mais detalhes
          </button>
        </Video>
        <ListVideos>
          <ul>
            <li>Introdução a algoritmos</li>
            <li>Comandos de Entrada</li>
            <li>Comandos de Saída</li>
            <li>Estruturas de Decisão</li>
          </ul>
        </ListVideos>
      </Container>
    </>
  );
}
