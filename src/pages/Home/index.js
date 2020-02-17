import React, { useState } from 'react';
import { MdOndemandVideo, MdArrowForward } from 'react-icons/md';

import { Container } from './styles';
import Cadastrar from '../../components/Cadastrar';
import Logar from '../../components/Logar';

export default function Home() {
  const [cadastro, setCadastro] = useState(true);
  return (
    <Container>
      <div className="info">
        <div>
          <header>
            <MdOndemandVideo color="#4265CE" fontSize={120} />
            <h1>Vidula</h1>
          </header>
          <p>
            Vidula é uma plataforma de videoaulas interativas onde o aluno
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
