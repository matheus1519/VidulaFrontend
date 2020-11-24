/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  BiCheckbox,
  BiCheckboxChecked,
  BiCheckboxSquare,
} from 'react-icons/bi';

import {
  Button,
  ButtonLink,
  MainLayout,
  Icon,
  TextArea,
  Modal,
  Avatar,
} from '~/components';

import Questions from './Questions';

import videoTest from '~/assets/video-test.mp4';
import avatarAnony from '~/assets/avatar-anony.png';

import {
  ModalContent,
  Header,
  Divider,
  CurrentSubject,
  Content,
  MainContent,
  Video,
  Decision,
  Teacher,
  Doubts,
  Doubt,
  DoubtBody,
  TakeDoubt,
  Subjects,
  Subject,
} from './styles';

import { useTheme } from '~/context/Theme';
import api from '~/services/api';

const questions = [
  {
    id: 1,
    label:
      'Escolher um bloco de código para executar se uma condição for verdadeira.',
  },
  {
    id: 2,
    label: 'Uma resposta qualquer aqui',
  },
  {
    id: 3,
    label: 'Uma resposta qualquer longa, comprida e que pule linha',
  },
  {
    id: 4,
    label: 'Uma resposta qualquer aqui',
  },
  {
    id: 5,
    label: 'Uma resposta qualquer aqui só que essa é maior.',
  },
];

function Watch() {
  const [questionStep, setQuestionStep] = useState(false);
  const [decisionStep, setDecisionStep] = useState(false);

  const [isRightAnswer, setiIsRightAnswer] = useState(null);

  const [disciplines, setDisciplines] = useState([]);
  const [disciplineSelected, setDisciplinesSelected] = useState({});
  const [changeDiscipline, setChangeDiscipline] = useState(true);

  const [subjects, setSubjects] = useState([]);
  const [subjectSelected, setSubjectSelected] = useState({});

  const [video, setVideo] = useState({});

  const { theme } = useTheme();
  const videoRef = useRef(null);

  useEffect(() => {
    api
      .get('disciplinas')
      .then(response => setDisciplines(response.data))
      .catch(fail => console.log(fail));
  }, []);

  const handleChangeDiscipline = useCallback(discipline => {
    setDisciplinesSelected(discipline);
    setChangeDiscipline(false);

    if (discipline.assuntos.length !== 0) {
      setSubjects(discipline.assuntos);
      setSubjectSelected(discipline.assuntos[0]);
      setVideo(discipline.assuntos[0].inicio);
      videoRef.current.load();
    }
  }, []);

  const onClickSubject = useCallback(subject => {
    setVideo(subject.inicio);
    setSubjectSelected(subject);
    setQuestionStep(false);
    setDecisionStep(false);

    videoRef.current.load();
  }, []);

  const onAnswerConfirm = useCallback(rightAnswer => {
    setiIsRightAnswer(rightAnswer);
    setQuestionStep(false);
    setDecisionStep(true);
  }, []);

  const onDetail = useCallback(vid => {
    setVideo(vid.detalhe);
    document.querySelector('video').load();
    setDecisionStep(false);
  }, []);

  const onNext = useCallback(vid => {
    setVideo(vid.proximo);
    document.querySelector('video').load();
    setDecisionStep(false);
  }, []);

  const onFinish = useCallback((currentDiscipline, currentSubject) => {
    currentDiscipline.assuntos.forEach(subject => {
      if (subject.id === currentSubject.id) {
        const index = currentDiscipline.assuntos.indexOf(currentSubject);
        if (index < currentDiscipline.assuntos.length - 1) {
          setSubjectSelected(currentDiscipline.assuntos[index + 1]);
          setVideo(currentDiscipline.assuntos[index + 1].inicio);
          setDecisionStep(false);
          videoRef.current.load();
        }
      }
    });
  }, []);

  return (
    <>
      {changeDiscipline && (
        <Modal title="Escolha uma disciplina" onClose={setChangeDiscipline}>
          <ModalContent>
            {disciplines.length !== 0 ? (
              disciplines.map(discipline => (
                <div
                  key={discipline.id}
                  onClick={() => handleChangeDiscipline(discipline)}
                >
                  <h3>{discipline.nome}</h3>
                  <p>{discipline.descricao}</p>
                </div>
              ))
            ) : (
              <>
                <h3>Nenhuma disciplina ainda foi adicionada.</h3>
                <h4>Volte amanhã.</h4>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      <MainLayout>
        <Header>
          <h1>{disciplineSelected.nome}</h1>
          <Button type="secondary" onClick={() => setChangeDiscipline(true)}>
            Trocar Disciplina
          </Button>
        </Header>
        <Divider />
        <CurrentSubject>{subjectSelected.nome}</CurrentSubject>
        <Content>
          <MainContent>
            <Video>
              {questionStep && (
                <Questions teste={video.teste} onConfirm={onAnswerConfirm} />
              )}
              {decisionStep && (
                <Decision failedQuestion={!isRightAnswer}>
                  <div>
                    <h4>
                      Você <span>{!isRightAnswer ? 'ERROU' : 'ACERTOU'}</span>
                    </h4>
                    {video.detalhe && <h4>O que deseja fazer?</h4>}
                  </div>
                  <div>
                    {video.proximo === null ? (
                      <Button
                        type={
                          !isRightAnswer && video.detalhe !== null
                            ? 'secondary'
                            : 'primary'
                        }
                        color="warning"
                        onClick={() =>
                          onFinish(disciplineSelected, subjectSelected)
                        }
                      >
                        Terminar assunto
                      </Button>
                    ) : (
                      <Button
                        type={
                          isRightAnswer || video.detalhe === null
                            ? 'primary'
                            : 'secondary'
                        }
                        color="warning"
                        onClick={() => onNext(video)}
                      >
                        Prosseguir com o conteúdo
                      </Button>
                    )}
                    {video.detalhe && (
                      <Button
                        flex
                        type={!isRightAnswer ? 'primary' : 'secondary'}
                        color="warning"
                        onClick={() => onDetail(video)}
                      >
                        Quero ver mais
                      </Button>
                    )}
                  </div>
                </Decision>
              )}
              <video
                ref={videoRef}
                onEnded={() => setQuestionStep(true)}
                preload="auto"
                autoPlay
              >
                <source src={video.url} type="video/mp4" />
                <track
                  src="captions_pt.vtt"
                  kind="captions"
                  srcLang="pt"
                  label="portuguese_captions"
                />
                Seu navegador está desatualizado e não suporta a visualização de
                videos!
              </video>
            </Video>
            <Teacher>
              <Avatar url={avatarAnony} />
              <div>
                <p>Henrique de Carvalho</p>
                <small>Professor de Matemática</small>
              </div>
            </Teacher>
            <Divider />
            <Doubts>
              <h3>59 Dúvidas</h3>
              <Doubt>
                <Avatar url={avatarAnony} alt="Juliana Mattos" />
                <div>
                  <h6>Juliana Mattos</h6>
                  <DoubtBody>
                    <p>
                      Não entendi a parte da comparação, quais sinais devo usar
                      para conseguir gerar um resultado ideal para uma conta
                      dessas?
                    </p>
                    <ButtonLink>Responder</ButtonLink>
                    {/* <div>
                    <Icon size={24} icon={AiOutlineLike} />
                  </div> */}
                  </DoubtBody>
                  <ButtonLink icon={FaChevronUp} mt="8">
                    Ocultar 1 resposta
                  </ButtonLink>
                  <Doubt>
                    <Avatar url={avatarAnony} alt="Alex Santos" />
                    <div>
                      <h6>
                        Henrique de Carvalho<small>PROFESSOR</small>
                      </h6>
                      <DoubtBody teacher>
                        <p>
                          Dessa forma não temos como mensaurar o ganho ao
                          utilizar essa forma.
                        </p>
                      </DoubtBody>
                    </div>
                  </Doubt>
                </div>
              </Doubt>
              <Doubt>
                <Avatar url={avatarAnony} alt="Alex Santos" />
                <div>
                  <h6>Alex Santos </h6>
                  <DoubtBody>
                    <p>
                      Porque não usar a forma descriva ao invés da comparativa?
                      Seria melhor encaixada.
                    </p>
                    {/* <ButtonLink>Responder</Bu  ttonLink> */}
                    <div>
                      <Icon size={24} icon={AiOutlineLike} />
                    </div>
                  </DoubtBody>
                </div>
              </Doubt>
              <TakeDoubt>
                <Avatar url={avatarAnony} alt="Usuário Atual" />
                <div>
                  <TextArea placeholder="Tire sua dúvida" />
                  <Button>Enviar</Button>
                </div>
              </TakeDoubt>
            </Doubts>
          </MainContent>
          <Subjects>
            <h3>
              {subjects.length !== 0 ? 'Assuntos' : 'Nenhum assunto diponível'}
            </h3>
            <ul>
              {subjects &&
                subjects.map(subject => (
                  <Subject
                    key={subject.id}
                    disabled={subjectSelected.id === subject.id}
                    onClick={() =>
                      subjectSelected.id !== subject.id &&
                      onClickSubject(subject)
                    }
                  >
                    <h5>{subject.nome}</h5>
                    <BiCheckboxChecked size={36} color={theme.success} />
                  </Subject>
                ))}
            </ul>
          </Subjects>
        </Content>
      </MainLayout>
    </>
  );
}

export default Watch;
