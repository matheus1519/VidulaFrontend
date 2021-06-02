import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import avatarAnony from '~/assets/avatar-anony.png';

import { Button, ButtonLink, Icon, TextArea, Avatar } from '~/components';
import api from '~/services/api';

import { Container, Doubt, DoubtBody, TakeDoubt } from './styles';

function Doubts({ doubts, teacher, subjectId }) {
  const { id: userIdLogged, avatarUrl, name: personName } = useSelector(
    state => state.user.user
  );

  const [doubtText, setDoubtText] = useState('');
  const [answerText, setAnswerText] = useState('');

  const [newDoubts, setNewDoubts] = useState(
    doubts.map(doubt => ({ ...doubt, answering: false }))
  );

  newDoubts.sort((a, b) => {
    if (a.likes.length > b.likes.length) {
      return -1;
    }
    if (b.likes.length > a.likes.length) {
      return 1;
    }
    return 0;
  });

  const renderTitle = () => {
    if (newDoubts.length === 0) {
      return 'Não há dúvidas nesse assunto';
    }
    if (newDoubts.length === 1) {
      return '1 Dúvida';
    }
    return `${newDoubts.length} Dúvidas`;
  };

  const handleAnswerDoubt = id => {
    setNewDoubts(
      newDoubts.map(doubt =>
        id === doubt.id
          ? { ...doubt, answering: true }
          : { ...doubt, answering: false }
      )
    );
  };

  const handleCancelAnswer = id => {
    setNewDoubts(
      newDoubts.map(doubt =>
        id === doubt.id ? { ...doubt, answering: false } : doubt
      )
    );
  };

  const sendDoubt = async () => {
    if (doubtText.split(' ').length < 4) {
      return toast.error('Nos explique mais detalhadamente sua dúvida');
    }

    try {
      await api.post('/comments', {
        doubt: doubtText,
        person: {
          id: userIdLogged,
        },
        subject: {
          id: subjectId,
        },
      });
    } catch (error) {
      return console.log(error);
    }

    setNewDoubts([
      ...newDoubts,
      {
        id: uuidv4(),
        doubt: doubtText,
        person: {
          id: userIdLogged,
          avatarUrl,
          name: personName,
        },
        subject: {
          id: subjectId,
        },
        likes: [],
      },
    ]);

    setDoubtText('');
  };

  const giveLike = doubtId => {
    const likeObj = {
      comment: {
        id: doubtId,
      },
      person: {
        id: userIdLogged,
      },
    };

    api.post('/likes', likeObj);

    setNewDoubts(
      newDoubts.map(doubt =>
        doubt.id === doubtId
          ? { ...doubt, likes: [...doubt.likes, likeObj] }
          : doubt
      )
    );
  };

  const sendAnswer = async doubtObj => {
    if (answerText.split(' ').length < 4) {
      return toast.error('A sua resposta é muito curta');
    }

    try {
      api.put(`/comments/${doubtObj.id}`, { ...doubtObj, answer: answerText });
    } catch (err) {
      return console.log(err);
    }

    setNewDoubts(
      newDoubts.map(doubt =>
        doubt.id === doubtObj.id
          ? { ...doubtObj, answer: answerText, answering: false }
          : doubt
      )
    );
  };

  return (
    <Container>
      <h3>{renderTitle()}</h3>
      {newDoubts.map(doubtObj => (
        <Doubt key={doubtObj.id}>
          <Avatar
            url={doubtObj.person.avatarUrl || avatarAnony}
            alt={doubtObj.person.name}
          />
          <div>
            <h6>{doubtObj.person.name}</h6>
            <DoubtBody>
              <p>{doubtObj.doubt}</p>
              {userIdLogged !== teacher.person.id && (
                <div>
                  {doubtObj.likes.length}
                  <Icon
                    disabled={doubtObj.likes.some(
                      like => like.person.id === userIdLogged
                    )}
                    size={24}
                    icon={AiOutlineLike}
                    onClick={() => giveLike(doubtObj.id)}
                  />
                </div>
              )}
              {userIdLogged === teacher.person.id &&
                !doubtObj.answer &&
                !doubtObj.answering && (
                  <ButtonLink onClick={() => handleAnswerDoubt(doubtObj.id)}>
                    Responder
                  </ButtonLink>
                )}
              {doubtObj.answering && (
                <ButtonLink onClick={() => handleCancelAnswer(doubtObj.id)}>
                  Cancelar
                </ButtonLink>
              )}
            </DoubtBody>
            {doubtObj.answering && (
              <TakeDoubt>
                <Avatar
                  url={teacher.person.avatarUrl || avatarAnony}
                  alt={teacher.person.avatarUrl}
                />
                <div>
                  <TextArea
                    placeholder={`Responda a ${doubtObj.person.name}`}
                    value={answerText}
                    onChange={e => setAnswerText(e.target.value)}
                  />
                  <Button onClick={() => sendAnswer(doubtObj)}>
                    Enviar minha resposta
                  </Button>
                </div>
              </TakeDoubt>
            )}
            {doubtObj.answer && (
              <Doubt>
                <Avatar
                  url={teacher.person.avatarUrl || avatarAnony}
                  alt={teacher.person.name}
                />
                <div>
                  <h6>
                    {teacher.person.name}
                    <small>
                      PROFESSOR{teacher.person.gender === 'female' && 'A'}
                    </small>
                  </h6>
                  <DoubtBody teacher>
                    <p>{doubtObj.answer}</p>
                  </DoubtBody>
                </div>
              </Doubt>
            )}
          </div>
        </Doubt>
      ))}
      {userIdLogged !== teacher.person.id && (
        <TakeDoubt>
          <Avatar url={avatarUrl || avatarAnony} alt={personName} />
          <div>
            <TextArea
              value={doubtText}
              onChange={e => setDoubtText(e.target.value)}
              placeholder="Tire sua dúvida"
            />
            <Button onClick={() => sendDoubt()}>Enviar minha Dúvida</Button>
          </div>
        </TakeDoubt>
      )}
    </Container>
  );
}

export default Doubts;
