/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BiCheckboxChecked } from 'react-icons/bi';
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

import { useTheme } from '~/hooks/Theme';
import api from '~/services/api';
import { isEmpty } from '~/util/isObjectEmpty';

function Watch() {
  const [questionStep, setQuestionStep] = useState(false);
  const [decisionStep, setDecisionStep] = useState(false);

  const [isRightAnswer, setIsRightAnswer] = useState(null);

  const [disciplines, setDisciplines] = useState([]);

  const [disciplineSelected, setDisciplineSelected] = useState({});

  const [changeDiscipline, setChangeDiscipline] = useState(
    !!isEmpty(disciplineSelected)
  );

  const [subjects, setSubjects] = useState([]);
  const [subjectSelected, setSubjectSelected] = useState({});

  const [video, setVideo] = useState({});

  const path = useSelector(state => state.watch.path);
  const userId = useSelector(state => state.user.user.id);

  const { theme } = useTheme();
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDisciplines() {
      const response = await api.get('/disciplinas');
      setDisciplines(response.data);
    }

    loadDisciplines();

    videoRef.current.load();
  }, []);

  const handleChangeDiscipline = useCallback(
    discipline => {
      setDisciplineSelected(discipline);
      dispatch(addDiscipline(discipline));
      setChangeDiscipline(false);
      setQuestionStep(false);
      setDecisionStep(false);

      if (discipline.subjects.length !== 0) {
        setSubjects(discipline.subjects);
        setSubjectSelected(discipline.subjects[0]);
        setVideo(discipline.subjects[0].inicio);
        dispatch(addVideo(discipline.subjects[0].inicio));

        videoRef.current.load();
      }
    },
    [dispatch]
  );

  const onClickSubject = useCallback(
    subject => {
      dispatch(addVideo(subject.inicio));
      setVideo(subject.inicio);

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
      const pathBefore = path;

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
      const pathBefore = path;

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

  const onFinish = (currentDiscipline, currentSubject, currentPath) => {
    console.log('currentPath', {
      path: currentPath,
      person: { id: userId },
      subject: { id: currentSubject.id },
    });

    const objWatch = {
      path: currentPath,
      person: { id: userId },
      subject: { id: currentSubject.id },
    };

    api.post('/watch', objWatch);

    setSubjects(
      subjects.map(subject =>
        subject.id === currentSubject.id
          ? { ...subject, watches: [...subject.watches, objWatch] }
          : subject
      )
    );

    currentDiscipline.subjects.forEach(subject => {
      if (subject.id === currentSubject.id) {
        const index = currentDiscipline.subjects.indexOf(currentSubject);
        if (index < currentDiscipline.subjects.length - 1) {
          setSubjectSelected(currentDiscipline.subjects[index + 1]);
          setVideo(currentDiscipline.subjects[index + 1].inicio);
          dispatch(addVideo(currentDiscipline.subjects[index + 1].inicio));

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
  };

  const userAlreadyWatchedThisSubject = useCallback(subject => {
    const personWatched = subject.watches.some(
      watch => watch.person?.id === userId
    );

    const isTheSameSubject = subject.watches.some(
      watch => watch.subject?.id === subject.id
    );

    return personWatched && isTheSameSubject;
  }, []);

  return (
    <>
      {changeDiscipline && disciplines.length !== 0 && (
        <Modal
          title="Escolha uma disciplina"
          onClose={isEmpty(disciplineSelected) ? null : setChangeDiscipline}
        >
          <ModalContent>
            {disciplines.map(
              discipline =>
                discipline.subjects?.length !== 0 && (
                  <div
                    key={discipline.id}
                    onClick={() => handleChangeDiscipline(discipline)}
                  >
                    <h3>{discipline.name}</h3>
                    <p>{discipline.description}</p>
                  </div>
                )
            )}
          </ModalContent>
        </Modal>
      )}
      <MainLayout>
        <Header>
          <h1>{disciplineSelected.name}</h1>
          <Button type="secondary" onClick={() => setChangeDiscipline(true)}>
            Trocar Disciplina
          </Button>
        </Header>
        <Divider />
        <CurrentSubject>{subjectSelected.name}</CurrentSubject>
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
              <Avatar
                url={subjectSelected.teacher?.person.avatarUrl || avatarAnony}
              />
              <div>
                <p>{subjectSelected.teacher?.person.name}</p>
                <small>
                  Professor
                  {subjectSelected.teacher?.person.gender === 'female' &&
                    'a'}{' '}
                  de {subjectSelected.teacher?.area}
                </small>
              </div>
            </Teacher>
            <Divider />
            {subjectSelected.comments && (
              <Doubts
                doubts={subjectSelected.comments}
                teacher={subjectSelected.teacher}
                subjectId={subjectSelected.id}
              />
            )}
          </MainContent>
          <Subjects>
            <h3>Assuntos</h3>
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
                    {userAlreadyWatchedThisSubject(subject) && (
                      <BiCheckboxChecked size={36} color={theme.success} />
                    )}
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
