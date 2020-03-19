import styled, { css } from 'styled-components';

export const ContainerGrid = styled.div``;

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
