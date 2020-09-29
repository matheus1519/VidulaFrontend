import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { lighten } from 'polished';
import hexToRgba from '~/util/hexToRgba';

export const Container = styled(Link)`
  color: ${({ theme }) => theme.primary};
  padding: 8px;
  transition: 0.2s;
  font-weight: bolder;

  :hover {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    border-radius: 4px;
    background-color: ${({ theme }) => hexToRgba(theme.primary, 0.2)};
    box-shadow: 0 4px 4px 0 ${({ theme }) => hexToRgba(theme.primary, 0.6)};
  }

  :active {
    color: ${({ theme }) => lighten(0.2, theme.primary)};
    background-color: ${({ theme }) => hexToRgba(theme.primary, 0.4)};
    box-shadow: unset;
  }
`;
