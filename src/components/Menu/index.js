import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { createHashHistory } from 'history';
import { MdOndemandVideo } from 'react-icons/md';
import './estilos.css';

export default function SideMenu() {
  const history = createHashHistory();

  function handleSair(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    history.go('/entrar');
  }

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="sm"
      bg="light"
      variant="light"
      className="py-2"
    >
      <Navbar.Brand className="align-items-center" href="principal">
        <MdOndemandVideo color="#4265CE" fontSize={40} />

        <span className="ml-2">Vidula</span>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="my-auto"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto  flex-wrap">
          <NavDropdown.Divider />

          <Nav.Link className="my-auto" href="/minhaconta">
            Minha Conta
          </Nav.Link>
          <NavDropdown.Divider />
          <Nav.Link onClick={handleSair}>
            <button
              type="button"
              className="btn btn-block btn-outline-danger btn-sm my-2 my-sm-0"
            >
              Sair
            </button>
          </Nav.Link>
          {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
