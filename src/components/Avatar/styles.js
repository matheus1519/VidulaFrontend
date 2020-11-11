import styled from 'styled-components';

export const Container = styled.img`
  max-height: ${({ size }) => size || 56}px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px ${({ theme }) => theme.disabled};
`;
