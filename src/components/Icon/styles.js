import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

export const Container = styled.div`
  width: fit-content;
  height: fit-content;
  padding:8px;
  transition: 0.2s;
  font-weight: bolder;
  border-radius: 4px;

  cursor:pointer;

  svg {
    color: ${({ theme, disabled }) =>
      disabled ? theme.disabled : theme.primary};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        color: ${({ theme }) => theme.secondary};
        text-decoration: none;
        background-color: ${({ theme }) => hexToRgba(theme.primary, 0.2)};
        box-shadow: 0 2px 4px 0 ${({ theme }) => hexToRgba(theme.primary, 0.6)};
      }
    `}

  ${({ disabled }) =>
    !disabled &&
    css`
      :active {
        color: ${({ theme }) => lighten(0.2, theme.primary)};
        background-color: ${({ theme }) => hexToRgba(theme.primary, 0.4)};
        box-shadow: unset;
      }
    `}
`;
