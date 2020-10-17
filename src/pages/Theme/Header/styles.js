import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  background: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
  color: ${({ theme }) => theme.texts.primary};
`;
