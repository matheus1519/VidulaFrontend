import React, { useState, useCallback } from 'react';

import { Avatar, Button, MainLayout, Modal } from '~/components';

import ApproveTeachers from './ApproveTeachers';
import ApproveLessons from './ApproveLessons';

import { ModalContent, Header, Divider, Content } from './styles';

function Administrative() {
  const [teacherActive, setTeacherActive] = useState(true);

  const [analyzeVideo, setAnalyzeVideo] = useState(false);
  const [person, setPerson] = useState(null);

  const personTest = {
    name: 'Lucas Almeida',
    email: 'lucasalmeida59@gmail.com',
    avatarUrl:
      'https://gravatar.com/avatar/1c8e8a6e8d1fe52b782b280909abeb38?s=800&d=robohash&r=x',
    video: {
      url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  };

  const handleAnalyzeVideo = useCallback(personSelected => {
    setAnalyzeVideo(true);
    setPerson(personSelected);
  }, []);

  return (
    <>
      {analyzeVideo && (
        <Modal title="Analisar videoaula." onClose={setAnalyzeVideo}>
          <ModalContent>
            <video onEnded={() => {}} controls preload="auto">
              <source src={personTest?.video?.url} type="video/mp4" />
              <track
                src="captions_pt.vtt"
                kind="captions"
                srcLang="pt"
                label="portuguese_captions"
              />
              Seu navegador está desatualizado e não suporta a visualização de
              videos!
            </video>
            <div>
              <Avatar size={88} url={personTest?.avatarUrl} />
              <div>
                <h3>{personTest?.name}</h3>
                <h4>{personTest?.email}</h4>
              </div>
            </div>
            <ul>
              <li>
                <Button type="secondary" color="danger">
                  Recusar
                </Button>
              </li>
              <li>
                <Button color="success">Aprovar</Button>
              </li>
            </ul>
          </ModalContent>
        </Modal>
      )}
      <MainLayout>
        <Header teacherActive={teacherActive}>
          <h1>Administrativo.</h1>
          <div>
            <Button
              type={teacherActive ? undefined : 'secondary'}
              onClick={() => setTeacherActive(true)}
            >
              Aprovar Professores
            </Button>
            <Button
              type={teacherActive ? 'secondary' : undefined}
              onClick={() => setTeacherActive(false)}
            >
              Aprovar Aulas
            </Button>
          </div>
        </Header>
        <Divider />
        <Content>
          {teacherActive ? (
            <ApproveTeachers onAnalyzeVideo={handleAnalyzeVideo} />
          ) : (
            <ApproveLessons />
          )}
        </Content>
      </MainLayout>
    </>
  );
}

export default Administrative;
