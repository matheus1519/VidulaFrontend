import styled, { css, keyframes } from 'styled-components';

const dimensao = 225;

const colorUndef = css`
  background: #aaa;
`;

const colorSuccess = css`
  background: #75ff75;
`;

const colorFailed = css`
  background: #ff7575;
`;

// const appear = keyframes`
//   from{
//     opacity:0;
//   }
//   to{
//     opacity:100%;
//   }
// `;
// animation: ${appear} linear 0.2s;

export const Container = styled.div``;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border-radius: 4px;

  height: ${dimensao / 1.9}px;
  background: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  transition: all 0.2s;
  ${props => (props.isDragActive || props.uploaded) && colorSuccess}
  ${props => (props.isDragReject || props.error) && colorFailed}
  ${props =>
    !props.uploaded &&
    !props.error &&
    !props.isDragActive &&
    !props.isDragReject &&
    colorUndef}

  ${props =>
    !props.children[0].props.disabled &&
    css`
      &:hover {
        box-shadow: 1px 1px 10px 2px black;
        cursor: pointer;
      }
    `}
`;

export const UploadMessage = styled.p`
  color: #01103b;
  margin: 0;
`;
