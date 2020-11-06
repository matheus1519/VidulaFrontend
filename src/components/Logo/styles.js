import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Container = styled(Link)`
  height: ${({ outline }) => (outline ? '36' : '41')}px !important;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
`;
