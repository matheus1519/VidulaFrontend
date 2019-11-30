import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './estilos.css';

import api from '../../services/api';

import logo from '../../assets/cerebro.png';

export default function Cadastrar({ history }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function firstLetterCapitalize(stringOriginal) {
    let strings = stringOriginal.split(' ');
    strings = strings.map(str => str[0].toUpperCase() + str.slice(1));
    const string = strings.join(' ');
    return string;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nom = firstLetterCapitalize(nome);
    const em = email.toLowerCase();

    api.post('usuarios', { nome: nom, email: em, senha });
    history.push('entrar');
  }

  return (
    <div className="cad">
      <header>
        <img src={logo} alt="logotipo" />
        <h2>Entrar no Vidula</h2>
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
