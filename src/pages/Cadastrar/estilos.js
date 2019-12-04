import styled, { css } from 'styled-components';

export const Container = styled.div`
  & {
    background: #fcfff2;
    min-width: 275px;
    max-width: 400px;
    height: 470px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 2px rgba(6, 77, 140, 0.534);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    margin: 10px 0;
    width: 150px;
  }
  form {
    width: 90%;
  }
  h2 {
    font-weight: bold;
  }
`;

export const Button = styled.button`
  ${props =>
    props.loading &&
    css`
      & {
        padding: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}
  svg {
    margin-top: -15px;
    outline: 0;
    border: 0;
  }
`;
