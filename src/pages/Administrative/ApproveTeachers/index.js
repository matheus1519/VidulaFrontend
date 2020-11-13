import React from 'react';
import { Avatar, ButtonLink } from '~/components';

import { Container } from './styles';

import avatarAnony from '~/assets/avatar-anony.png';

function ApproveTeachers({ onAnalyzeVideo }) {
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

  return (
    <Container>
      <h2>Aprovar Professores</h2>
      <ul>
        <li>
          <Avatar size={147} url={avatarAnony} />
          <h3>Lucas Almeida é professor de matemática.</h3>
          <ButtonLink onClick={() => onAnalyzeVideo(personTest)}>
            Analisar Videoaula
          </ButtonLink>
        </li>
        <li>
          <Avatar size={147} url={avatarAnony} />
          <h3>Leandro Maciel é professor de física.</h3>
          <ButtonLink onClick={() => onAnalyzeVideo(personTest)}>
            Analisar Videoaula
          </ButtonLink>
        </li>
        <li>
          <Avatar size={147} url={avatarAnony} />
          <h3>Alzira Oliveira é professora de informática.</h3>
          <ButtonLink onClick={() => onAnalyzeVideo(personTest)}>
            Analisar Videoaula
          </ButtonLink>
        </li>
        <li>
          <Avatar size={147} url={avatarAnony} />
          <h3>Maria Gabriela é professora de geografia.</h3>
          <ButtonLink onClick={() => onAnalyzeVideo(personTest)}>
            Analisar Videoaula
          </ButtonLink>
        </li>
      </ul>
    </Container>
  );
}

export default ApproveTeachers;
