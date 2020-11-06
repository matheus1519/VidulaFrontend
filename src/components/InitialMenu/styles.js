import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Buttons = styled.div`
  margin-left: 24px;

  a + a {
    margin-left: 8px;
  }
`;
