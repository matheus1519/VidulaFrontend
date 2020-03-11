import styled, { css } from 'styled-components';

const colorUndef = css`
  background: #aaa;
`;

const colorSuccess = css`
  background: #75ff75;
`;

const colorFailed = css`
  background: #ff7575;
`;

let disabled = false;

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
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  ${props => !props.uploaded && !props.error && colorUndef}
  ${props => props.uploaded && colorSuccess}
  ${props => props.error && colorFailed}

  ${props =>
    !props.children[0].props.disabled &&
    css`
      &:hover {
        box-shadow: 1px 1px 20px 2px black;
        cursor: pointer;
      }
    `}

  input {
    display: none;
  }
`;

export const VideoInfo = styled.div``;
