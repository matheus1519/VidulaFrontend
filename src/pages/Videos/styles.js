import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  overflow: auto;
  justify-items: center;
`;

export const Header = styled.header`
  display: flex;
  margin: 0 5px;
`;
