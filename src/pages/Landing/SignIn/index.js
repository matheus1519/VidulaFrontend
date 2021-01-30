/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import getValidationErrors from '~/util/getValidationErrors';
import isEmail from '~/util/isEmail';

import { Input, Button } from '~/components';

import { Container } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';
import api from '~/services/api';

function SignIn() {
  const [emailBefore, setEmailBefore] = useState('');
  const [emailNotExists, setEmailNotExists] = useState(false);

  const loading = useSelector(state => state.auth.loading);

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const emailExists = useCallback(async () => {
    const { email } = formRef.current.getData();

    if (email.length !== 0 && email !== emailBefore && isEmail(email)) {
      try {
        const response = await api.get(`/users/existe/${email}`);

        if (!response.data) {
          toast.error('Este email não existe!');
          setEmailNotExists(true);
        } else {
          setEmailNotExists(false);
        }
      } catch (error) {
        toast.error('Sem conexão com o servidor!');
      }
    }

    setEmailBefore(email);
  }, [emailBefore]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        if (emailNotExists) {
          return toast.error('Este email não existe!');
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(signInRequest(data.email, data.password));
      } catch (err) {
        const errors = getValidationErrors(err);

        return formRef.current?.setErrors(errors);
      }

      // setTimeout(() => {
      //   toast.error('Sem conexão com o servidor!');
      // }, 5000);
    },
    [emailNotExists, dispatch]
  );

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <h4>Entrar no Vidula</h4>
      <Input
        name="email"
        icon={FiMail}
        placeholder="Email"
        onBlur={emailExists}
      />
      <Input
        name="password"
        icon={FiLock}
        type="password"
        placeholder="Senha"
      />
      <Button loading={loading} type="submit" flex>
        Entrar
      </Button>
      {/* <ButtonLink to="/esqueci-minha-senha" mt="8">
        Recuperar minha senha
      </ButtonLink> */}
    </Container>
  );
}

export default SignIn;
