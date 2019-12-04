import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
// import {} from 'react-icons/md'
import ReactLoading from 'react-loading';

import { Container, Button } from './estilos';

import api from '../../services/api';
import firstLetterCapitalize from '../../funcs';

import logo from '../../assets/cerebro.png';

export default function Cadastrar({ history }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (userId != null) {
      history.push('main');
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const nom = firstLetterCapitalize(nome);
    const em = email.toLowerCase();

    try {
      let existe = await api.get(`usuarios/existe/${email}`);
      existe = existe.data;
      if (!existe) {
        await api.post('usuarios', {
          nome: nom,
          email: em,
          senha,
        });
      } else {
        console.log('Usuário já cadastrado!');
      }
      history.push('entrar');
    } catch {
      console.log('Erro na requisição - Servidor OFF');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <header>
        <img src={logo} alt="logotipo" />
        <h2>Cadastrar no Vidula</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Digite seu nome"
          onChange={event => setNome(event.target.value)}
          value={nome}
        />
        <input
          required
          type="email"
          placeholder="Digite seu email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />
        <input
          required
          type="password"
          placeholder="Digite sua senha"
          onChange={event => setSenha(event.target.value)}
          value={senha}
        />
        <Button loading className="primario" type="submit">
          {loading ? (
            <ReactLoading
              type="bubbles"
              width={80}
              height={80}
              color="#fcfff2"
            />
          ) : (
            'Cadastrar'
          )}
        </Button>
        <span>
          Já tenho conta, <Link to="/entrar">entrar no vidula</Link>.
        </span>
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
