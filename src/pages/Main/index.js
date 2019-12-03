import React, { useEffect } from 'react';

// import { Container } from "./estilos.css";

export default function Main({ history }) {
  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (userId === null) {
      history.push('/entrar');
    }
  }, []);

  return <div>Main</div>;
}
