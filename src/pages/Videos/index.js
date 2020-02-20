import React, { useState } from 'react';
import Menu from '../../components/Menu';
import api from '../../services/api';

// import { Container } from './styles';

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
      <div className="container mt-5">Gerenciar Vídeos</div>
      <form>
        <input
          type="file"
          name="1-principal"
          id="1-principal"
          onChange={handleFile}
        />
      </form>
    </>
  );
}
