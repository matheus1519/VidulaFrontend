import styled from 'styled-components';

import { darken, lighten } from '@material-ui/core';
import hexToRgba from '~/util/hexToRgba';

export const Container = styled.button`
  color: ${({ theme, color, type }) =>
    type === 'primary' || type === 'submit' ? theme.darkBlue : theme[color]};
  background-color: ${({ theme, color, type }) =>
    type === 'primary' || type === 'submit'
      ? theme[color]
      : hexToRgba(theme[color], 0.1)};
  border: 1px solid ${({ theme, color }) => theme[color]};
  padding: ${({ small }) => (small ? 8 : 16)}px;
  transition: 0.2s;
  font-weight: bold;
  border-radius: 4px;
  font-size: 1rem;
  text-transform: uppercase;
  width: ${({ flex }) => (flex ? '100%' : 'fit-content')};

  :hover {
    background-color: ${({ theme, color, type }) =>
      type === 'primary' || type === 'submit'
        ? lighten(theme[color], 0.2)
        : hexToRgba(theme[color], 0.3)};
    border-color: ${({ theme, color, type }) =>
      (type === 'primary' || type === 'submit') && lighten(theme[color], 0.2)};
    box-shadow: 0 2px 4px 0
      ${({ theme, color }) => hexToRgba(theme[color], 0.6)};
  }

  :active {
    background-color: ${({ theme, color, type }) =>
      type === 'primary' || type === 'submit'
        ? darken(theme[color], 0.2)
        : hexToRgba(theme[color], 0.5)};
    border-color: ${({ theme, color, type }) =>
      (type === 'primary' || type === 'submit') && darken(theme[color], 0.2)};
    box-shadow: unset;
  }
`;
