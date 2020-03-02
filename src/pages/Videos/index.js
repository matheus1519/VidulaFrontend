import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import Menu from '../../components/Menu';
import api from '../../services/api';

import { Container, Video, VideoGroup } from './styles';

export default function Videos() {
  const [video, setVideo] = useState(null);

  function handleFile(e) {
    setVideo(e.target.files[0]);
    const data = new FormData();
    data.append('1-principal', video);
    api.post('/videos', data);
  }

  return (
    <>
      <Menu />
      <Container className="container mt-4">
        <h1>Gerenciar Vídeos</h1>
        <hr className="dropdown-divider"></hr>
        <form>
          <VideoGroup>
            <input type="text" placeholder="Nome" />
            <Video htmlFor="1-principal">
              <input type="file" name="1-principal" id="1-principal" />
              <MdAdd size={50} />
            </Video>
          </VideoGroup>
        </form>
      </Container>
    </>
  );
}
