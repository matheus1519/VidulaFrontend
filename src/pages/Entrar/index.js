import React from 'react';
import { Link } from 'react-router-dom';

import './estilos.css';

import logo from '../../assets/cerebro.png';

export default function Entrar() {
  return (
    <div className="ent">
      <header>
        <img src={logo} alt="logotipo" />
        <h2>Entrar no Vidula</h2>
      </header>
      <form>
        <input type="text" placeholder="Digite seu usuário" />
        <input type="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
        <span>
          Não sou cadastrado, <Link to="/cadastrar">criar uma conta</Link>.
        </span>
      </form>
    </div>
  );
}
