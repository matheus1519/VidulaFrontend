import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { lighten } from 'polished';
import hexToRgba from '~/util/hexToRgba';

export const Container = styled(Link).attrs(props => ({
  disabled: props.disabled,
}))`
  color: ${({ theme, disabled }) =>
    disabled ? theme.disabled : theme.primary};
  padding: 8px;
  transition: 0.2s;
  font-weight: bolder;
  border-radius: 4px;

  margin-top: ${({ mt }) => `${mt}px` || 'unset'};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
        background-color: ${({ theme }) => hexToRgba(theme.primary, 0.2)};
        box-shadow: 0 4px 4px 0 ${({ theme }) => hexToRgba(theme.primary, 0.6)};
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
