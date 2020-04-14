import styled, { keyframes } from 'styled-components';
// import PerfectScrollbar from "react-perfect-scrollbar";

const dimensao = 225;

export const ContainerInput = styled.div`
  width: ${dimensao}px;
  padding: 10px;
  > input {
    padding: 5px 10px;
    font-size: 12pt;
    margin: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
  grid-gap: 5px;
  overflow: auto;
  justify-items: center;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 0 5px;

  div svg:hover {
    cursor: pointer;
  }

  @media (max-width: 575px) {
    h1 {
      font-size: 16pt;
      margin: 0;
    }
  }
`;

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

export const Modal = styled.div`
  animation: ${showModal} ease-in-out 0.2s;

  color: #01103b;
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
  > div {
    animation: ${appear} ease-in-out 0.3s;
    position: relative;
    max-width: 600px;
    background: #ebf2ff;
    padding: 20px;
    border-radius: 4px;
    h4 {
      color: #01103b !important;
    }
    button#add {
      display: flex;
      align-items: center;
      position: absolute;
      top: 111px;
      right: 220px;
      margin: 0;
    }
    button#add:hover svg {
      fill: #ffffff;
    }

    div {
      div svg {
        color: #01103b !important;
        fill: #01103b !important;
      }
      input:focus {
        border: 0;
        outline: 0;
        color: #01103b;
      }
    }
    div#step2 {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;

      button:hover svg {
        fill: #ffffff;
      }
    }
  }
`;

export const ContainerMaior = styled.div`
  position: relative;
`;

export const ModalTool = styled.div`
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
