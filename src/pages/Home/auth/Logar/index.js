import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { MdOndemandVideo } from 'react-icons/md';
import { toast, Zoom } from 'react-toastify';

import { signInRequest } from '~/store/modules/auth/actions';
import { Container, Button } from './estilos';
import api from '~/services/api';
import history from '~/services/history';

export default function Logar() {
  const [email, setEmail] = useState('');
  const [emailAntes, setEmailAntes] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaAntes, setSenhaAntes] = useState('');
  const [errorEmail, setErroEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const userId = localStorage.getItem('user');
  //   if (userId != null) {
  //     history.push('/principal');
  //   }
  // }, []);

  const useStyles = makeStyles({
    progress: {
      width: '100%',
      height: '5px',
      '& > * + *': {},
      borderRadius: 5,
    },
  });

  function errorEmailMsg() {
    toast.error('Não existe um usuário com esse email.', {
      transition: Zoom,
    });
    setErroEmail(true);
  }

  function errorServidor() {
    toast.error('Sem conexão com o servidor!', {
      transition: Zoom,
    });
  }

  function errorSenha() {
    if (senhaAntes !== senha) {
      toast.error('Senha incorreta!', {
        transition: Zoom,
      });
      setSenhaAntes(senha);
    }
  }

  async function emailExist() {
    setEmailAntes(email);
    if (emailAntes !== email) {
      try {
        const input = document.querySelector('input');
        if (input.validity.valid) {
          const response = await api.get(`/usuarios/existe/${email}`);
          if (response.data) {
            setErroEmail(false);
          } else {
            errorEmailMsg();
          }
        }
      } catch (error) {
        errorServidor();
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    dispatch(signInRequest(email, senha));

    // let response = false;
    // try {
    //   if (!errorEmail) {
    //     response = await api.post('/sessions', {
    //       email,
    //       senha,
    //     });
    //   } else {
    //     errorEmailMsg();
    //     setLoading(false);
    //     return;
    //   }
    // } catch (error) {
    //   errorServidor();
    //   return;
    // }
    // if (response.data) {
    //   history.push('/principal');
    // } else {
    //   errorSenha();
    // }

    setLoading(false);
  }

  const classes = useStyles();

  return (
    <Container>
      <header>
        <MdOndemandVideo color="#4265CE" fontSize={150} />
        <h2>Iniciar Sessão</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="Digite seu email"
          onChange={event => setEmail(event.target.value)}
          value={email}
          onBlur={emailExist}
          maxLength={100}
        />

        <input
          required
          type="password"
          placeholder="Digite sua senha"
          id="senha"
          onChange={event => setSenha(event.target.value)}
          value={senha}
        />

        <Button
          loading={loading}
          className="btn btn-primary btn-block"
          type="submit"
        >
          Entrar
        </Button>
        {loading && (
          <LinearProgress color="primary" className={classes.progress} />
        )}
      </form>
    </Container>
  );
}
