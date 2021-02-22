import styled, { css } from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

const width = 250;

export const Container = styled.div`
  background: ${({ theme }) => theme.texts.secondary};
  width: ${width}px;
  height: ${width / 1.77}px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: 0.2s;

  :hover {
    box-shadow: 0 2px 4px 0 ${({ theme }) => hexToRgba(theme.primary, 0.6)};
  }

  ${props =>
    ((props.isDragActive && !props.isDragReject) || props.uploaded) &&
    css`
      background: ${props.theme.success};
    `}

  ${props =>
    (props.isDragReject || props.error) &&
    css`
      background: ${props.theme.danger};
    `}



  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        box-shadow: unset;
        cursor: default;
      }
    `}

  svg {
    color: ${({ theme }) => theme.backgrounds.secondary};
  }
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.backgrounds.primary};
  margin: 0;
`;
