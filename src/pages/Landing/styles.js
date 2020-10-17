import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding: 48px;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;

  img {
    fill: ${({ theme }) => theme.texts.primary};
  }
`;

export const Buttons = styled.div`
  margin-left: 24px;

  a + a {
    margin-left: 8px;
  }
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
