import styled, { css } from 'styled-components';

const dragActive = css`
  background: #75ff75;
`;

const dragReject = css`
  background: #ff7575;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
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

  transition: height 0.2s ease;
  ${props => props.isDragActive && dragActive}
  ${props => props.isDragReject && dragReject}

  &:hover {
    box-shadow: 1px 1px 20px 2px black;
  }
`;

export const UploadMessage = styled.p`
  color: #01103b;
`;
