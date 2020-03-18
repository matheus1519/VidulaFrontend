import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    '00 01 02 03'
    '10 11 12 13'
    '20 21 22 23';
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
