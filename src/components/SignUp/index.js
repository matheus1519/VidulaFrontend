/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast, Zoom } from 'react-toastify';

import getValidationErrors from '~/util/getValidationErrors';
import isEmail from '~/util/isEmail';

import { Input, Button } from '~/components';

import { Container } from './styles';
import history from '~/services/history';
import api from '~/services/api';
import { signInRequest } from '~/store/modules/auth/actions';

function SignUp() {
  const [emailBefore, setEmailBefore] = useState('');

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const isEmailAvailable = useCallback(async () => {
    const { email } = formRef.current.getData();

    if (email.length !== 0 && email !== emailBefore && isEmail(email)) {
      const response = await api.get(`/usuarios/existe/${email}`);

      if (!response.data) {
        toast.success('Email disponível!');
      } else {
        toast.error('Este email já está sendo usado!');
      }
    }

    setEmailBefore(email);
  }, [emailBefore]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .matches(/\s{1,}/, 'Digite seu nome completo')
            .required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        try {
          await api.post('/usuarios', {
            nome: data.name,
            email: data.email.toLowerCase(),
            senha: data.password,
          });

          toast.success('Conta criada com sucesso!', {
            transition: Zoom,
          });

          dispatch(signInRequest(data.email, data.password));

          history.push('/');
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [dispatch]
  );

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <h4>Crie conta no Vidula</h4>
      <Input
        name="email"
        icon={FiMail}
        placeholder="Email"
        onBlur={isEmailAvailable}
      />
      <Input name="name" icon={FiUser} placeholder="Nome" />
      <Input
        name="password"
        icon={FiLock}
        type="password"
        placeholder="Senha"
      />
      <Button type="submit" flex>
        Criar Conta
      </Button>
    </Container>
  );
}

export default SignUp;
