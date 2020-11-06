import styled from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

export const Container = styled.div`
  background: ${({ theme }) => theme.backgrounds.secondary};
  box-shadow: inset 0px -2px 5px ${({ theme }) => hexToRgba(theme.texts.primary, 0.2)};
  display: flex;
  justify-content: center;
  width: 100%;

  > div {
    max-width: 1100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin: 8px 48px;
  }
`;

export const LinksGroup = styled.div`
  a + a {
    margin-left: 8px;
  }
`;
