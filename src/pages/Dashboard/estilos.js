import styled, { keyframes } from 'styled-components';
import { lighten } from '@material-ui/core';

const appear = keyframes`
  from{
    transform:translateY(-200px);
    opacity:0;
  }
  to{
    transform:translateY(0);
    opacity:100%;
  }
`;

export const ContainerVidList = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 576px) {
    font-size: 12pt;
  }
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 5px;
`;

export const Video = styled.div`
  box-sizing: unset;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  video {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;

export const ButtonGroup = styled.div`
  animation: ${appear} ease-in-out 0.3s;
  background: #01103b99;
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;

  button {
    height: auto;
  }
`;

export const ListVideos = styled.div`
  background: #ebf2ff44;
  border-radius: 4px;
  overflow: hidden;

  h4 {
    background: #4265ce;
    padding: 10px;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 15px 0px;

    li {
      padding: 5px 10px;
    }
    li:hover {
      background: #ebf2ff;
      color: #01103b;
      cursor: pointer;
    }
  }
`;

export const ContainerMaior = styled.div`
  position: relative;
`;

export const DisciplinaList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 400px));
  grid-gap: 15px;
  li {
    border: 0.5px solid #4265ce;
    border-radius: 4px;
    padding: 10px;
    background: ${lighten('#EBF2FF', 0.8)};

    p {
      color: ${lighten('#032791', 0.2)};
      margin: 0;
    }
  }
  li:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px 1px #01103b;
    transform: translateY(-5px);
  }
`;
