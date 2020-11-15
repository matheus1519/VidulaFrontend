import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding: 48px 0;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 100px;
  height: 100%;
  align-items: center;
`;

export const Info = styled.div`
  h2 {
    margin-bottom: 48px;
  }

  h3 {
    color: ${({ theme }) => theme.disabled};
    margin-bottom: 24px;
  }
`;

export const Login = styled.div``;