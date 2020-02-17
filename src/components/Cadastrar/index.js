import React, { useState, useEffect } from 'react';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
// import ReactLoading from 'react-loading';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { MdOndemandVideo } from 'react-icons/md';
// import { Link } from 'react-router-dom';

import { Container, Button } from './estilos';
import api from '../../services/api';

// import logo from '../../assets/logo.png';
// import firstLetterCapitalize from '../../funcs';

export default function Cadastrar({ history }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  // const [usuario, setUsuario] = useState({ id: -1, senha: '', email: '' });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const userId = localStorage.getItem('user');
  //   if (userId != null) {
  //     history.push('/principal');
  //   }
  // }, []);

  async function emailExist() {
    try {
      const response = await api.get(`/usuarios/email/${email}`);
      if (response.data) {
        console.log(
          'Já existe um usuário com esse email. Entrar com essa conta!'
        );
      }
    } catch (error) {}
  }

  const useStyles = makeStyles({
    progress: {
      width: '100%',
      height: '5px',
      '& > * + *': {},
      borderRadius: 5,
    },
  });

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   setLoading(true);
  //   if (usuario.id === -1) {
  //     await api.post('usuarios', {
  //       nome: firstLetterCapitalize(nome),
  //       email: email.toLowerCase(),
  //       senha,
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
      <form onSubmit={() => {}}>
        <input
          required
          type="email"
          placeholder="Digite seu email"
          onChange={event => setEmail(event.target.value)}
          onBlur={emailExist}
          value={email}
        />
        <input
          type="text"
          placeholder="Digite seu nome"
          id="nome"
          onChange={event => setNome(event.target.value)}
          value={nome}
        />
        <input
          required
          type="password"
          placeholder="Digite sua senha"
          id="senha"
          onChange={event => setSenha(event.target.value)}
          value={senha}
        />

        <Button loading={loading} className="btn btn-primary" type="submit">
          Cadastrar
        </Button>
        {loading && (
          <LinearProgress color="primary" className={classes.progress} />
        )}
      </form>
    </Container>
  );
}

Cadastrar.defaultProps = {
  history: null,
};

Cadastrar.propTypes = {
  history: PropTypes.shape(historyPropTypes),
};
