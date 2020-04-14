import React, { useState } from 'react';
import { MdOndemandVideo } from 'react-icons/md';

import { Container } from './styles';
import Cadastrar from './auth/Cadastrar';
import Logar from './auth/Logar';

export default function Home() {
  const [cadastro, setCadastro] = useState(false);
  return (
    <Container>
      <div className="info">
        <div>
          <header>
            <MdOndemandVideo size={80} />
            <h1>Vidula</h1>
          </header>
          <p>
            Vidula é uma plataforma de videoaulas interativas onde o estudante
            decide se precisa de mais conteúdo.
          </p>
          <p>Faça você seu próprio tempo de acordo com suas necessidades.</p>
          <button
            type="button"
            onClick={() => setCadastro(!cadastro)}
            className="btn btn-secondary"
          >
            {cadastro ? 'Já tenho conta' : 'Criar Conta'}
          </button>
        </div>
      </div>
      <div className="cad">{cadastro ? <Cadastrar /> : <Logar />}</div>
    </Container>
  );
}
