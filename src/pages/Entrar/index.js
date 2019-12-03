import React, { useState, useEffect } from 'react';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './estilos.css';

import api from '../../services/api';

import logo from '../../assets/cerebro.png';

export default function Entrar({ history }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (userId != null) {
      history.push('main');
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.get(`usuarios/usuario/${usuario}@`);

    if (response.status === 200) {
      if (senha === response.data.senha) {
        localStorage.setItem('user', response.data.id);
        history.push('main');
      } else {
        console.log('Senha inválida!');
      }
    } else {
      console.log('Usuário não encontrado!');
    }
  }

  return (
    <div className="ent">
      <header>
        <img src={logo} alt="logotipo" />
        <h2>Entrar no Vidula</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Digite seu usuário"
          onChange={event => setUsuario(event.target.value)}
          value={usuario}
        />
        <input
          required
          type="password"
          placeholder="Digite sua senha"
          onChange={event => setSenha(event.target.value)}
          value={senha}
        />
        <button required type="submit">
          Entrar
        </button>
        <span>
          Não sou cadastrado, <Link to="/cadastrar">criar uma conta</Link>.
        </span>
      </form>
    </div>
  );
}

Entrar.defaultProps = {
  history: null,
};

Entrar.propTypes = {
  history: PropTypes.shape(historyPropTypes),
};
