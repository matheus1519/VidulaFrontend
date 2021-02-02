import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 10%;
  padding: 48px 32px;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Info = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: fit-content;
    margin: 8px 0 24px;
  }

  h3 {
    margin-bottom: 24px;
  }

  h5 {
    margin: 16px 0 8px;
  }

  p + p {
    margin-top: 16px;
  }
`;

export const SignUpContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const template = styled.div``;
