import styled, { keyframes } from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

const swipeDown = keyframes`
  0%{
    transform: translateY(-200px);
    opacity:0;
  }
  100%{
    transform: translateY(0);
    opacity:1;
  }
`;

export const Container = styled.div`
  animation: ${swipeDown} 0.2s;

  ul {
    display: flex;
    align-items: center;

    li + li {
      margin-left: 24px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  margin: 32px 0 16px;

  h3 {
    width: 200px;
    color: ${({ theme }) => theme.disabled};
  }
`;

export const Lesson = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;

  /* & + & {
  } */

  &:nth-child(even) {
    background: ${({ theme }) => hexToRgba(theme.backgrounds.secondary, 0.5)};
  }

  > div {
    display: flex;

    h5 {
      width: 200px;
    }
  }
`;
