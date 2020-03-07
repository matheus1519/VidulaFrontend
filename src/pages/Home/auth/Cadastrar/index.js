import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { MdOndemandVideo } from 'react-icons/md';
import { toast, Zoom } from 'react-toastify';

import { Container, Button } from './estilos';
import api from '~/services/api';
import history from '~/services/history';

import firstLetterCapitalize from '~/util/funcs';

export default function Cadastrar() {
  const useStyles = makeStyles({
    progress: {
      width: '100%',
      height: '5px',
      '& > * + *': {},
      borderRadius: 5,
    },
  });
  const [email, setEmail] = useState('');
  const [emailAntes, setEmailAntes] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErroEmail] = useState(false);

  // useEffect(() => {
  //   const userId = localStorage.getItem('user');
  //   if (userId != null) {
  //     history.push('/principal');
  //   }
  // }, []);

  function errorEmailMsg() {
    toast.error('Já existe um usuário com esse email.', {
      transition: Zoom,
    });
    setErroEmail(true);
  }

  function errorServidor() {
    toast.error('Sem conexão com o servidor!', {
      transition: Zoom,
    });
  }

  async function emailExist() {
    setEmailAntes(email);
    if (emailAntes !== email) {
      try {
        const input = document.querySelector('input');
        if (input.validity.valid) {
          const response = await api.get(`/usuarios/existe/${email}`);
          if (!response.data) {
            toast.success('Email disponível!', {
              autoClose: 5000,
              transition: Zoom,
            });
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
    let response = false;
    if (!errorEmail) {
      response = await api.post('/usuarios', {
        nome: firstLetterCapitalize(nome),
        email: email.toLowerCase(),
        senha,
      });
    } else {
      errorEmailMsg();
    }
    if (response.data) {
      history.push('/principal');
    } else if (!errorEmail) {
      errorServidor();
    }

    setLoading(false);
  }

  const classes = useStyles();

  return (
    <Container>
      <header>
        <MdOndemandVideo color="#4265CE" fontSize={150} />
        <h2>Criar uma conta</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="Digite seu email"
          onChange={event => {
            setEmail(event.target.value);
          }}
          onBlur={emailExist}
          maxLength={100}
        />
        <input
          required
          type="text"
          onChange={event => setNome(event.target.value)}
          value={nome}
          placeholder="Digite seu nome"
          maxLength={50}
        />
        <input
          required
          type="password"
          placeholder="Digite sua senha"
          onChange={event => setSenha(event.target.value)}
          value={senha}
          maxLength={50}
        />

        <Button
          loading={loading}
          className="btn btn-primary btn-block"
          type="submit"
        >
          Cadastrar
        </Button>
        {loading && (
          <LinearProgress color="primary" className={classes.progress} />
        )}
      </form>
    </Container>
  );
}
