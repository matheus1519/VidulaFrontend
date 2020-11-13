import React, { useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { MdPhotoCamera } from 'react-icons/md';
import { GrReactjs } from 'react-icons/gr';

import { Form } from '@unform/web';

import { RadioGroup, TextField } from '@material-ui/core';
import { Avatar, Button, Input, MainLayout, Modal } from '~/components';

import {
  ModalContent,
  Header,
  Divider,
  Person,
  AvatarClickable,
  Content,
  SectionTitle,
  ChangePassword,
  AboutYou,
  FormStyled,
  DateStyled,
  Teacher,
} from './styles';
import RadioButton from '~/styles/RadioButton';

function MyAccount() {
  const [changeProfile, setChangeProfile] = useState(true);

  const [gender, setGender] = useState('masculino');
  const [birthDate, setBirthDate] = useState('2000-01-01');

  return (
    <>
      {changeProfile && (
        <Modal title="Mudar de Perfil." onClose={setChangeProfile}>
          <ModalContent>
            <h4>
              A mudança de perfil para professor é feita através de uma
              solicitação.
            </h4>
            <div>
              <p>
                1. É necessario que tenha concluido seu cadastro. Preencha as
                informações na secção “Sobre você”.
              </p>
              <p>
                2. Precisamos que você grave uma videuaula. Pode ser explicando
                sobre qualquer assunto. Não precisa aparecer.
              </p>
              <p>3. Envie a videoaula gravada e preencha o campo abaixo.</p>
            </div>
            <h5>Component Add Video</h5>
            <Form>
              <Input
                fit
                name="area"
                icon={GrReactjs}
                placeholder="Área. Ex: matemática"
              />
            </Form>
            <Button>Solicitar mundança de perfil</Button>
          </ModalContent>
        </Modal>
      )}
      <MainLayout>
        <Header>
          <h1>Informações pessoais.</h1>
          <small>Evite compartilhar suas informações com outras pessoas.</small>
        </Header>
        <Divider />
        <Person>
          <AvatarClickable>
            <div>
              <MdPhotoCamera size={48} />
            </div>
            <Avatar
              size={120}
              url="https://gravatar.com/avatar/1c8e8a6e8d1fe52b782b280909abeb38?s=800&d=robohash&r=x"
            />
          </AvatarClickable>
          <div>
            <h2>Lucas Almeida</h2>
            <h3>lucasalmeida59@gmail.com</h3>
          </div>
        </Person>
        <Content>
          <ChangePassword>
            <SectionTitle>Mudar senha</SectionTitle>
            <Form onSubmit={data => console.log(data)}>
              <Input
                name="oldPassword"
                icon={FiLock}
                type="password"
                placeholder="Senha antiga"
              />
              <Input
                name="newPassword"
                icon={FiLock}
                type="password"
                placeholder="Nova senha"
              />
              <Input
                name="confirmPassword"
                icon={FiLock}
                type="password"
                placeholder="Confirme a nova senha"
              />
            </Form>
          </ChangePassword>
          <AboutYou>
            <SectionTitle>Sobre você</SectionTitle>
            <div>
              <h4>Sexo</h4>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(_, value) => setGender(value)}
                style={{ flexDirection: 'row', flexWrap: 'nowrap' }}
              >
                <RadioButton
                  value="masculino"
                  label="Masculino"
                  checked={gender}
                />
                <RadioButton
                  value="feminino"
                  label="Feminino"
                  checked={gender}
                />
              </RadioGroup>
            </div>
            <div>
              <h4>Data de Nascimento</h4>
              <DateStyled>
                <TextField
                  type="date"
                  value={birthDate}
                  onChange={event => setBirthDate(event.target.value)}
                  defaultValue={birthDate}
                />
              </DateStyled>
            </div>
            <div>
              <h4>CPF</h4>
              <FormStyled>
                <Input
                  name="cpf"
                  icon={BsPersonBoundingBox}
                  placeholder="Cpf"
                />
              </FormStyled>
            </div>
          </AboutYou>
          <Teacher>
            <SectionTitle>Professor</SectionTitle>
            <h4>Gostaria de produzir videoaulas para o Vidula?</h4>
            <Button flex onClick={() => setChangeProfile(true)}>
              Mudar de Perfil
            </Button>
          </Teacher>
        </Content>
      </MainLayout>
    </>
  );
}

export default MyAccount;
