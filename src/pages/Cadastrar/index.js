import React from 'react';
import { Link } from 'react-router-dom';

import './estilos.css';

import logo from '../../assets/cerebro.png';

export default function Cadastrar() {
  return (
    <div className="cad">
      <header>
        <img src={logo} alt="logotipo" />
        <h2>Entrar no Vidula</h2>
      </header>
      <form>
        <input type="text" placeholder="Digite seu nome" />
        <input type="text" placeholder="Digite seu email" />
        <input type="password" placeholder="Digite sua senha" />
        <button type="submit">Cadastrar</button>
        <span>
          Já tenho conta, <Link to="/entrar">entrar no vidula</Link>.
        </span>
      </form>
    </div>
  );
}
