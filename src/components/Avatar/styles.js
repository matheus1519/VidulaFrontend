import styled from 'styled-components';

export const Container = styled.div`
  .MuiAvatar-root {
    box-shadow: 0px 0px 4px ${({ theme }) => theme.disabled};
    height: ${({ size }) => size || 56}px;
    width: ${({ size }) => size || 56}px;
  }
`;
