import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: -4px;

  svg {
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;
