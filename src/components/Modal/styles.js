import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

const swipeDown = keyframes`
  0%{
    transform: translateY(-50px);
  }
  100%{
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  position: absolute;

  backdrop-filter: blur(4px);
  background: ${({ theme }) => theme.disabled};
  width: 100%;
  height: 100%;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    animation: ${swipeDown} ease-out 0.2s;
    width: fit-content;
    height: fit-content;
    max-width: 60%;
    max-height: 90%;
    padding: 16px 32px 32px;
    box-shadow: 0px 0px 10px ${({ theme }) => theme.backgrounds.primary};
    border-radius: 4px;
    background: ${({ theme }) => theme.backgrounds.primary};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  svg {
    margin-left: 16px;
    cursor: pointer;

    :active {
      fill: ${({ theme }) => shade(0.2, theme.danger)};
    }
  }
`;
