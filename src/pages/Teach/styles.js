import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding: 48px 0;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 100px;
`;

export const SignUpContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Info = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    margin-bottom: 24px;
  }

  h4 {
    margin-bottom: 8px;
  }

  h4 + div {
    margin-bottom: 24px;
  }

  p + p {
    margin-top: 16px;
  }
`;

export const template = styled.div``;
