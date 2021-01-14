/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import getValidationErrors from '~/util/getValidationErrors';
import isEmail from '~/util/isEmail';

import { Input, Button } from '~/components';

import { Container } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';
import api from '~/services/api';

function SignIn() {
  const [emailBefore, setEmailBefore] = useState('');
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const emailExists = useCallback(async () => {
    const { email } = formRef.current.getData();

    if (email.length !== 0 && email !== emailBefore && isEmail(email)) {
      const response = await api.get(`/usuarios/existe/${email}`);

      if (!response.data) {
        toast.error('Este email não existe!');
      }
    }

    setEmailBefore(email);
  }, [emailBefore]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
      dispatch(signInRequest(data.email, data.password));
    },
    [dispatch]
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
      <Button type="submit" flex>
        Entrar
      </Button>
      {/* <ButtonLink to="/esqueci-minha-senha" mt="8">
        Recuperar minha senha
      </ButtonLink> */}
    </Container>
  );
}

export default SignIn;
