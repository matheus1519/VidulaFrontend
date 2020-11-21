/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

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
  const [decisionStep, setDecisionStep] = useState(true);

  const [failedQuestion, setFailedQuestion] = useState(null);

  const [disciplines, setDisciplines] = useState([]);
  const [disciplineSelected, setDisciplinesSelected] = useState({});
  const [changeDiscipline, setChangeDiscipline] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [subjectSelected, setSubjectSelected] = useState({});

  const { theme } = useTheme();

  useEffect(() => {
    api
      .get('disciplinas')
      .then(response => setDisciplines(response.data))
      .catch(fail => console.log(fail));
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
                  onClick={() => {
                    setDisciplinesSelected(discipline);
                    setChangeDiscipline(false);
                    setSubjects(discipline.assuntos);
                    setSubjectSelected(discipline.assuntos[0]);
                  }}
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
        <CurrentSubject>Estrutura de decição simples</CurrentSubject>
        <Content>
          <MainContent>
            <Video>
              {questionStep && (
                <Questions
                  questions={questions}
                  onConfirm={failed => setFailedQuestion(failed)}
                />
              )}
              {decisionStep && (
                <Decision failedQuestion={failedQuestion}>
                  <div>
                    <h4>
                      Você <span>{failedQuestion ? 'ERROU' : 'ACERTOU'}</span>
                    </h4>
                    <h4>O que deseja fazer?</h4>
                  </div>
                  <div>
                    <Button color="warning">Prosseguir com o conteúdo</Button>
                    <Button flex type="secondary" color="warning">
                      Quero ver mais
                    </Button>
                  </div>
                </Decision>
              )}
              <video onEnded={() => {}} controls preload="auto">
                <source src={videoTest} type="video/mp4" />
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
            <h3>Assuntos</h3>
            <ul>
              <Subject>
                <h5>Introdução a Programação</h5>
                <BiCheckboxChecked size={36} color={theme.success} />
              </Subject>
              <Subject>
                <h5>Comandos de Saída</h5>
                <BiCheckboxChecked size={36} color={theme.success} />
              </Subject>
              <Subject>
                <h5>Variáveis</h5>
                <BiCheckboxChecked size={36} color={theme.success} />
              </Subject>
              <Subject disabled>
                <h5>Comandos de Entrada</h5>
                <BiCheckboxSquare size={36} color={theme.warning} />
              </Subject>
              <Subject>
                <h5>Operador de Atribuição</h5>
                <BiCheckbox size={36} color={theme.danger} />
              </Subject>
              <Subject>
                <h5>Estrutura de Decição</h5>
                <BiCheckbox size={36} color={theme.danger} />
              </Subject>
            </ul>
          </Subjects>
        </Content>
      </MainLayout>
    </>
  );
}

export default Watch;
