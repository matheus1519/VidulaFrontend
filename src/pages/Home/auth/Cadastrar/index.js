import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { MdOndemandVideo } from 'react-icons/md';
import { toast } from 'react-toastify';

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
  // const [usuario, setUsuario] = useState({ id: -1, senha: '', email: '' });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const userId = localStorage.getItem('user');
  //   if (userId != null) {
  //     history.push('/principal');
  //   }
  // }, []);

  async function emailExist() {
    setEmailAntes(email);
    if (emailAntes !== email) {
      try {
        const response = await api.get(`/usuarios/existe/${email}`);
        if (!response.data) {
          toast.success('Email disponível!', { autoClose: 5000 });
        } else {
          toast.error('Já existe um usuário com esse email.');
        }
      } catch (error) {
        toast.error('Sem conexão com o servidor!');
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await api.post('/usuarios', {
      nome: firstLetterCapitalize(nome),
      email: email.toLowerCase(),
      senha,
    });
    setLoading(false);
    history.push('/principal');
  }

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   setLoading(true);
  //   if (usuario.id === -1) {
  //     await api.post('usuarios', {
  //
  //     });
  //   } else if (senha !== usuario.senha) {
  //     console.log('Senha inválida!'); //  Substituir por toaste
  //     return;
  //   }

  //   localStorage.setItem('user', usuario.id);
  //   history.push('/principal');
  //   setLoading(false);
  // }

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
        />
        <input
          required
          type="text"
          onChange={event => setNome(event.target.value)}
          value={nome}
          placeholder="Digite seu nome"
        />
        <input
          required
          type="password"
          placeholder="Digite sua senha"
          onChange={event => setSenha(event.target.value)}
          value={senha}
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
