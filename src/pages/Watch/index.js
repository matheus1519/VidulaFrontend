/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useRef, useState } from 'react';

// import { BiCheckboxChecked } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import {
  addDiscipline,
  addVideo,
  updatePath,
} from '~/store/modules/watch/actions';

import { Button, MainLayout, Modal, Avatar } from '~/components';

import Questions from './Questions';
import Doubts from './Doubts';

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
  Subjects,
  Subject,
} from './styles';

// import { useTheme } from '~/context/Theme';
import api from '~/services/api';
import { isEmpty } from '~/util/isObjectEmpty';

function Watch() {
  const [questionStep, setQuestionStep] = useState(false);
  const [decisionStep, setDecisionStep] = useState(false);

  const [isRightAnswer, setIsRightAnswer] = useState(null);

  const [disciplines, setDisciplines] = useState([]);

  const getDisciplineStored = useSelector(state => state.watch.discipline);

  const [disciplineSelected, setDisciplinesSelected] = useState(
    getDisciplineStored || {}
  );

  const [changeDiscipline, setChangeDiscipline] = useState(
    !!isEmpty(disciplineSelected)
  );

  const [subjects, setSubjects] = useState([]);
  const [subjectSelected, setSubjectSelected] = useState({});

  const [video, setVideo] = useState({});
  const getStoredVideo = useSelector(state => state.watch.video);

  const path = useSelector(state => state.watch.path);
  const userId = useSelector(state => state.user.user.id);

  // const { theme } = useTheme();
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get('disciplinas')
      .then(response => {
        setDisciplines(response.data);
      })
      .catch(fail => console.log(fail));

    if (
      !isEmpty(disciplineSelected) &&
      disciplineSelected.assuntos.length !== 0
    ) {
      setSubjects(disciplineSelected.assuntos);
      setSubjectSelected(disciplineSelected.assuntos[0]);
      setVideo(getStoredVideo || disciplineSelected.assuntos[0].inicio);
    }
  }, [getStoredVideo, disciplineSelected]);

  const handleChangeDiscipline = useCallback(
    discipline => {
      setDisciplinesSelected(discipline);
      dispatch(addDiscipline(discipline));
      setChangeDiscipline(false);
      setQuestionStep(false);
      setDecisionStep(false);

      if (discipline.assuntos.length !== 0) {
        setSubjects(discipline.assuntos);
        setSubjectSelected(discipline.assuntos[0]);
        setVideo(discipline.assuntos[0].inicio);
        dispatch(addVideo(discipline.assuntos[0].inicio));

        videoRef.current.load();
      }
    },
    [dispatch]
  );

  const onClickSubject = useCallback(
    subject => {
      setVideo(subject.inicio);
      dispatch(addVideo(subject.inicio));

      setSubjectSelected(subject);
      setQuestionStep(false);
      setDecisionStep(false);

      videoRef.current.load();
    },
    [dispatch]
  );

  const onAnswerConfirm = useCallback(rightAnswer => {
    setIsRightAnswer(rightAnswer);
    setQuestionStep(false);
    setDecisionStep(true);
  }, []);

  const onDetail = useCallback(
    vid => {
      let pathBefore = path;

      setVideo(vid.detalhe);
      dispatch(addVideo(vid.detalhe));

      videoRef.current.load();
      setDecisionStep(false);

      setTimeout(() => {
        dispatch(updatePath(`${pathBefore} d`));
      }, 500);
    },
    [dispatch, path]
  );

  const onNext = useCallback(
    vid => {
      let pathBefore = path;

      setVideo(vid.proximo);
      dispatch(addVideo(vid.proximo));

      videoRef.current.load();
      setDecisionStep(false);

      setTimeout(() => {
        dispatch(updatePath(`${pathBefore} p`));
      }, 500);
    },
    [dispatch, path]
  );

  const onFinish = useCallback(
    (currentDiscipline, currentSubject, currentPath) => {
      console.log('currentPath', currentPath);
      api.post('/watch', {
        path: currentPath,
        visto: true,
        user: { id: userId },
        subject: { id: currentSubject.id },
      });

      currentDiscipline.assuntos.forEach(subject => {
        if (subject.id === currentSubject.id) {
          const index = currentDiscipline.assuntos.indexOf(currentSubject);
          if (index < currentDiscipline.assuntos.length - 1) {
            setSubjectSelected(currentDiscipline.assuntos[index + 1]);
            setVideo(currentDiscipline.assuntos[index + 1].inicio);
            dispatch(addVideo(currentDiscipline.assuntos[index + 1].inicio));

            setDecisionStep(false);
            videoRef.current.load();
          }

          // Send path and viewed

          // api.get('/assuntos').then(response => {
          //   console.log(response);
          //   setSubjects(response.data);
          // });

          setTimeout(() => {
            dispatch(updatePath(''));
          }, 3000);
        }
      });
    },
    [userId, dispatch]
  );

  return (
    <>
      {changeDiscipline && (
        <Modal title="Escolha uma disciplina" onClose={setChangeDiscipline}>
          <ModalContent>
            {console.log(disciplines)}
            {disciplines.length !== 0 ? (
              disciplines.map(
                discipline =>
                  discipline.assuntos?.length !== 0 && (
                    <div
                      key={discipline.id}
                      onClick={() => handleChangeDiscipline(discipline)}
                    >
                      <h3>{discipline.nome}</h3>
                      <p>{discipline.descricao}</p>
                    </div>
                  )
              )
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
                          onFinish(disciplineSelected, subjectSelected, path)
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
                        onClick={() => {
                          onNext(video);
                        }}
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
                controls
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
            <Doubts />
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
                    {/* {subject.watches && (
                      <BiCheckboxChecked size={36} color={theme.success} />
                    )} */}
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
