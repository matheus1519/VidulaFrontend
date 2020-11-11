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
    margin: 24px 0 0;
    list-style: none;
    display: flex;
    overflow-x: auto;

    li + li {
      margin-left: 24px;
    }

    li {
      min-width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: ${({ theme }) => theme.backgrounds.secondary};
      box-shadow: inset 0px 0px 5px
        ${({ theme }) => hexToRgba(theme.texts.primary, 0.2)};
      border-radius: 4px;
      padding: 32px 32px 24px;
      margin-bottom: 32px;

      h3 {
        margin: 32px 0 16px;
        text-align: center;
      }
    }
  }
`;
