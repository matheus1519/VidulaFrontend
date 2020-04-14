import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  from{
    transform:translateX(50px);
  }
  to{
    transform:translateX(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .info {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    & > div {
      width: 80%;
      height: auto;
      padding: 20px 20px 30px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      h1 {
        margin: 0 20px;
        font-size: 52pt;
      }
    }
    p {
      font-size: 16pt;
    }

    button {
      margin-top: 30px;
      width: unset;
    }
  }
  .cad {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    /* animation: ${appear} linear 0.2s; */
  }
`;
