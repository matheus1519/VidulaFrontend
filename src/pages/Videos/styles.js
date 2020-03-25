import styled, { css } from 'styled-components';

const dimensao = 225;

export const ContainerInput = styled.div`
  width: ${dimensao}px;
  padding: 10px;
  > input {
    padding: 5px 10px;
    font-size: 12pt;
    margin: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
  grid-gap: 5px;
  overflow: auto;
  justify-items: center;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 0 5px;

  @media (max-width: 575px) {
    h1 {
      font-size: 16pt;
      margin: 0;
    }
  }
`;
