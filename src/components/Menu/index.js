import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { MdOndemandVideo } from 'react-icons/md';
import './estilos.css';

export default function SideMenu() {
  return (
    <Navbar sticky="top" expand="sm" bg="primary" variant="dark">
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
          <Nav.Link className="my-auto" href="/">
            Sair
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
