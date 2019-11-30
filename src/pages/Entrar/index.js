import React from 'react';

import './estilos.css';

import logo from '../../assets/cerebro.png';

export default function Entrar() {
  return (
    <div className="container">
      <header>
        <img src={logo} alt="logotipo" />
        <h2>Entrar no Vidula</h2>
      </header>
      <form>
        <input type="text" placeholder="Digite seu usuário" />
        <input type="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
        <span>
          Não sou cadastrado, <a href="/cadastrar">criar uma conta</a>.
        </span>
      </form>
    </div>
  );
}
