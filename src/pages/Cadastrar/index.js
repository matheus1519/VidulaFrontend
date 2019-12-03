import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';

import './estilos.css';

import api from '../../services/api';

import logo from '../../assets/cerebro.png';

export default function Cadastrar({ history }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (userId != null) {
      history.push('main');
    }
  }, []);

  function firstLetterCapitalize(stringOriginal) {
    let strings = stringOriginal.split(' ');
    strings = strings.map(str => str[0].toUpperCase() + str.slice(1));
    const string = strings.join(' ');
    return string;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nom = firstLetterCapitalize(nome);
    const em = email.toLowerCase();

    const response = await api.post('usuarios', {
      nome: nom,
      email: em,
      senha,
    });
    if (response.data === true) {
      history.push('entrar');
    } else {
      console.log('Erro ao cadastrar!');
    }
  }

  return (
    <div className="cad">
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
        <button type="submit">Cadastrar</button>
        <span>
          Já tenho conta, <Link to="/entrar">entrar no vidula</Link>.
        </span>
      </form>
    </div>
  );
}

Cadastrar.defaultProps = {
  history: null,
};

Cadastrar.propTypes = {
  history: PropTypes.shape(historyPropTypes),
};
