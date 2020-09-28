import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  background: ${({ theme }) => theme.colors.backgrounds.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
  color: ${({ theme }) => theme.colors.texts.primary};
`;
