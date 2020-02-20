import React from 'react';
import { MdOndemandVideo } from 'react-icons/md';
// import history from '../../services/history';

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary px-3 px-sm-5 sticky-top">
      <a className="navbar-brand d-flex align-items-center" href="/principal">
        <MdOndemandVideo color="#4265CE" fontSize={40} />
        <span className="ml-2">Vidula</span>
      </a>
      <button
        style={{ width: 'unset' }}
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav ml-auto ">
          <div className="dropdown-divider" />
          <li className="nav-item">
            <a className="nav-link" href="/videos">
              Gerenciar Videos
            </a>
          </li>
          <div className="dropdown-divider" />
          <li className="nav-item">
            <a className="nav-link" href="/minhaconta">
              Minha Conta
            </a>
          </li>
          <div className="dropdown-divider" />
          <li className="nav-item">
            <a
              className="nav-link"
              href="/sair"
              tabindex="-1"
              aria-disabled="true"
            >
              Sair
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
