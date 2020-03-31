import React from 'react';
import { Link } from 'react-router-dom';
import { MdOndemandVideo } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';

export default function Menu() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary py-1 px-3 px-sm-5 sticky-top">
      <Link className="navbar-brand d-flex align-items-center" to="/principal">
        <MdOndemandVideo fontSize={34} />
        <span className="ml-2">Vidula</span>
      </Link>
      <button
        className="navbar-toggler m-0"
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
            <Link className="nav-link" to="/videos">
              Gerenciar Videos
            </Link>
          </li>
          <div className="dropdown-divider" />
          <li className="nav-item">
            <Link className="nav-link" to="/minhaconta">
              Minha Conta
            </Link>
          </li>
          <div className="dropdown-divider" />
          <li className="nav-item">
            <button
              style={{ background: 'none', fontSize: 'unset', margin: 0 }}
              type="submit"
              className="nav-link btn-link"
              onClick={handleSignOut}
              tabIndex="-1"
              aria-disabled="true"
            >
              Sair
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
