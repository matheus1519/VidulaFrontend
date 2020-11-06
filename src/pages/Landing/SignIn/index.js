import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import * as Yup from 'yup';
import getValidationErrors from '~/util/getValidationErrors';

import { Input, Button, ButtonLink } from '~/components';

import { Container } from './styles';

import history from '~/services/history';

function SignIn() {
  const formRef = useRef(null);

  const handleSubmit = useCallback(async data => {
    try {
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

      // eslint-disable-next-line no-unused-expressions
      formRef.current?.setErrors(errors);
    }

    // history.push('/ver');
  }, []);

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <h4>Entrar no Vidula</h4>
      <Input name="email" icon={FiMail} placeholder="Email" mb="16" />
      <Input
        name="password"
        icon={FiLock}
        type="password"
        placeholder="Senha"
        mb="16"
      />
      <Button type="submit" flex>
        Entrar
      </Button>
      <ButtonLink to="/esqueci-minha-senha" mt="8">
        Recuperar minha senha
      </ButtonLink>
    </Container>
  );
}

export default SignIn;
