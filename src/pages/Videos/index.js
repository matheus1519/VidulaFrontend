import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';

import Menu from '../../components/Menu';
import Upload from '~/components/Upload';
import api from '~/services/api';

import { Container, Video, VideoGroup } from './styles';
import { MdAdd, MdCheckCircle, MdError } from 'react-icons/md';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function Videos() {
  const [progresso, setProgresso] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [errorUp, setErrorUp] = useState(false);
  const [video, setVideo] = useState(null);

  function handleFile(e) {
    setVideo(e.target.files[0]);
    const data = new FormData();
    data.append('1-principal', video);
    try {
      api.post('/videos', data, {
        onUploadProgress: ev => {
          // eslint-disable-next-line radix
          const progress = parseInt(Math.round((ev.loaded * 100) / ev.total));
          setProgresso(progress);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Menu />
      <Container className="container mt-4">
        <h1>Gerenciar Vídeos</h1>
        <hr className="dropdown-divider" />
        <form>
          <VideoGroup>
            <input type="text" placeholder="Nome" />
            <Video htmlFor="video">
              <input
                id="video"
                type="file"
                accept="video/*"
                onChange={e => handleFile(e)}
              />
              {!progresso && <MdAdd fill="#0434C4" size={50} />}
              {!uploaded && !errorUp && !!progresso && (
                <CircularProgressbar
                  styles={{
                    root: { width: 40 },
                    path: { stroke: '#032791' },
                  }}
                  strokeWidth={10}
                  value={progresso}
                />
              )}

              {uploaded && <MdCheckCircle size={48} cor="#75ff75" />}
              {errorUp && <MdError size={48} cor="#ff7575" />}
            </Video>
          </VideoGroup>
        </form>
        <button type="submit" className="mt-5 btn btn-primary btn-lg">
          Concluir
        </button>
      </Container>
    </>
  );
}
