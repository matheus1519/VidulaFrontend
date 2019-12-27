import React, { useState, useEffect } from 'react';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
// import ReactLoading from 'react-loading';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import $ from 'jquery';
import { MdOndemandVideo } from 'react-icons/md';
// import { Link } from 'react-router-dom';

import { Container, ContainerBranco, Button } from './estilos';

import api from '../../services/api';
// import logo from '../../assets/logo.png';
import firstLetterCapitalize from '../../funcs';

export default function Entrar({ history }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState({ id: -1, senha: '', email: '' });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (userId != null) {
      history.push('/principal');
    }
  }, []);

  const useStyles = makeStyles({
    progress: {
      width: '100%',
      '& > * + *': {},
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (usuario.id === -1) {
      await api.post('usuarios', {
        nome: firstLetterCapitalize(nome),
        email: email.toLowerCase(),
        senha,
      });
    } else if (senha !== usuario.senha) {
      console.log('Senha inválida!'); //  Substituir por toaste
      return;
    }

    localStorage.setItem('user', usuario.id);
    history.push('/principal');
    setLoading(false);
  }

  async function handleFieldEmail(event) {
    event.preventDefault();
    setLoading(true);
    if (email === null || email === '') {
      setLoading(false);
      $('#nome').hide(200);
      return;
    }
    try {
      if (email !== usuario.email) {
        const response = await api.get(`usuarios/email/${email}`);
        const user = response.data;
        setUsuario({ id: user.id, email: user.email, senha: user.senha });
      }
      $('#nome')
        .show(200)
        .removeAttr('required');
      $('#nome').hide(200);
    } catch {
      $('#nome')
        .show(200)
        .attr('required', 'required');
      setUsuario({ id: -1 });
    } finally {
      setLoading(false);
    }
  }

  const classes = useStyles();

  return (
    <Container>
      {loading && (
        <LinearProgress color="secondary" className={classes.progress} />
      )}

      <ContainerBranco>
        <header>
          <MdOndemandVideo color="#4265CE" fontSize={150} />
          <h2>Entrar no Vidula</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Digite seu email"
            onChange={event => setEmail(event.target.value)}
            onBlur={handleFieldEmail}
            value={email}
          />

          <input
            required
            type="password"
            placeholder="Digite sua senha"
            id="senha"
            onChange={event => setSenha(event.target.value)}
            value={senha}
          />
          <input
            type="text"
            placeholder="Digite seu nome"
            id="nome"
            onChange={event => setNome(event.target.value)}
            value={nome}
          />
          <Button loading={loading} className="primario" type="submit">
            {
              // <ReactLoading
              //   type="bubbles"
              //   width={80}
              //   height={80}
              //   color="#fcfff2"
              // />
            }
            Entrar
          </Button>
        </form>
      </ContainerBranco>
    </Container>
  );
}

Entrar.defaultProps = {
  history: null,
};

Entrar.propTypes = {
  history: PropTypes.shape(historyPropTypes),
};
