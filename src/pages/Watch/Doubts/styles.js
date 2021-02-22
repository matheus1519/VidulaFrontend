import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from{
    transform:translateX(-56px);
  }

  to{
    transform:translateX(0);

  }
`;

export const Container = styled.div`
  margin-bottom: 64px;

  h3 {
    margin-bottom: 16px;
  }
`;

export const Doubt = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  b + & {
    margin-top: 8px;
  }

  & + & {
    margin-top: 16px;
  }

  div + & {
    margin-top: 8px;
  }

  > div:last-child {
    margin-left: 8px;
    width: 100%;

    h6 {
      margin-bottom: 8px;
      position: relative;

      small {
        color: ${({ theme }) => theme.disabled};
        margin-left: 8px;
      }
    }
  }
`;

export const DoubtBody = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;

  b {
    margin-top: -8px;
    margin-right: -8px;
  }

  p {
    width: fit-content;
  }

  > div {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-top: -8px;
    margin-right: -8px;
    color: ${({ theme }) => theme.primary};
    > div {
      margin-left: 8px;
    }
  }
`;

export const TakeDoubt = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;

  animation: ${slideDown}.2s;

  > div:last-child {
    margin-left: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 8px;
    }
  }
`;
