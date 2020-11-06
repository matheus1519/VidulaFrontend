import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

// import * as Yup from 'yup';
// import getValidationErrors from '~/util/getValidationErrors';

import { Input, Button } from '~/components';

import { Container } from './styles';
import history from '~/services/history';

function SignUp() {
  const formRef = useRef(null);

  const handleSubmit = useCallback(async data => {
    // try {
    //   const schema = Yup.object().shape({
    //     name: Yup.string().required('Nome obrigatório'),
    //     email: Yup.string()
    //       .required('Email obrigatório')
    //       .email('Digite um email válido'),
    //     password: Yup.string().required('Senha obrigatória'),
    //   });

    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });
    // } catch (err) {
    //   const errors = getValidationErrors(err);

    //   // eslint-disable-next-line no-unused-expressions
    //   formRef.current?.setErrors(errors);
    // }

    history.push('/ver');
  }, []);

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <h4>Crie conta no Vidula</h4>
      <Input name="email" icon={FiMail} placeholder="Email" mb="16" />
      <Input name="name" icon={FiUser} placeholder="Nome" mb="16" />
      <Input
        name="password"
        icon={FiLock}
        type="password"
        placeholder="Senha"
        mb="16"
      />
      <Button type="submit" flex>
        Criar Conta
      </Button>
    </Container>
  );
}

export default SignUp;
