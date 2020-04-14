import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  from{
    transform:translateY(50px);
    opacity:0;
  }
  to{
    transform:translateY(0);
    opacity:100%;
  }
`;

const showModal = keyframes`
from{
  opacity:0;
}
to{
  opacity:100%;
}
`;

export const ModalTool = styled.div`
  * {
    color: #01103b;
  }

  animation: ${showModal} ease-in-out 0.2s;
  width: 100vw;
  height: 100vh;
  background: #01103bbb;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    z-index: 2;
    position: relative;
    animation: ${appear} ease-in-out 0.3s;
    background: #ebf2ff;
    width: auto;
    height: auto;
    border-radius: 10px;
    padding: 30px;
    h4 {
      color: #01103b;
      margin-bottom: 30px;
    }
    svg {
      position: absolute;
      top: -30px;
      right: -30px;
      transition: 0.2s;
    }
    svg:hover {
      cursor: pointer;
      filter: drop-shadow(0px 0px 5px #01103b);
    }
    div.bac {
      position: absolute;
      top: -15px;
      right: -15px;
      z-index: -2;
      padding: 15px;
      border-radius: 50%;
    }
  }
`;
