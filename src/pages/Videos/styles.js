import styled from 'styled-components';

export const Container = styled.div``;

export const VideoGroup = styled.div`
  width: 280px;
  margin-top: 30px;
  border-radius: 4px;
  > input {
    padding: 10px 15px;
    font-size: 12pt;
    margin: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Video = styled.label`
  width: 100%;
  height: 150px;
  background: #aaa;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  &:hover {
    box-shadow: 1px 1px 20px 2px black;
  }

  input {
    display: none;
  }
`;

export const VideoInfo = styled.div``;
