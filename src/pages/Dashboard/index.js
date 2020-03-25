import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../components/Menu';
import { Container, Video, ListVideos } from './estilos';

export default function Dashboard() {
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
            Seu navegador esta desatualizado e não suporta a visualização de
            videos!
          </video>
          <div className="btn-group">
            <button type="button" className="btn btn-outline-primary btn-lg">
              Necessito de mais detalhes
            </button>
            <button type="button" className="btn btn-primary">
              Entendi, prosseguir com conteúdo
            </button>
          </div>
        </Video>
        <ListVideos>
          <ul>
            <li>Video 1</li>
            <li>Video 2</li>
            <li>Video 3</li>
            <li>Video 4</li>
          </ul>
        </ListVideos>
      </Container>
    </>
  );
}
