import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

export const ModalContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 32px;

  > div {
    position: relative;
    background: ${({ theme }) => theme.backgrounds.secondary};
    box-shadow: 0px 0px 4px
      ${({ theme }) => hexToRgba(theme.texts.primary, 0.6)};
    border-radius: 4px;
    padding: 16px 32px;
    cursor: pointer;
    transition: 0.2s;

    p {
      margin-top: 16px;
      color: ${({ theme }) => theme.disabled};
      margin-left: 4px;
    }

    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      transition: 0.2s;
    }

    :hover {
      box-shadow: 0px 0px 4px
          ${({ theme }) => hexToRgba(theme.texts.primary, 0.6)},
        0 2px 8px 0 ${({ theme }) => hexToRgba(theme.primary, 0.6)};

      p {
        color: ${({ theme }) => theme.texts.primary};
        transition: 0.2s;
      }
    }

    :active {
      box-shadow: 0px 0px 4px
        ${({ theme }) => hexToRgba(theme.texts.primary, 0.6)};

      ::after {
        background: ${({ theme }) => hexToRgba(theme.primary, 0.6)};
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    color: ${({ theme }) => theme.disabled};
  }
`;

export const Divider = styled.hr`
  margin: 24px 0;
`;

export const CurrentSubject = styled.h2`
  margin-bottom: 16px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 376px;
  grid-gap: 64px;
`;

export const MainContent = styled.div``;

export const Video = styled.div`
  position: relative;
  border-radius: 4px;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* This is the mainly problematic line*/
    border-radius: 4px;
  }
`;

export const Decision = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 4px);
  border-radius: 4px;
  padding: 48px 32px;

  background: ${({ theme }) => hexToRgba(theme.backgrounds.primary, 0.9)};
  box-shadow: inset 0px 0px 5px
    ${({ theme }) => hexToRgba(theme.texts.primary, 0.2)};
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > div {
    text-align: center;

    span {
      color: ${({ theme, failedQuestion }) =>
        failedQuestion ? theme.danger : theme.success};
    }
  }

  div + div {
    display: flex;
    flex-direction: column;
    align-items: center;

    button + button {
      margin-top: 32px;
    }
  }
`;

export const Teacher = styled.div`
  display: flex;
  margin: 16px 0 32px;

  div {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin-bottom: 4px;
    }

    small {
      color: ${({ theme }) => theme.disabled};
    }
  }
`;

export const Avatar = styled.img`
  height: 56px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px ${({ theme }) => theme.disabled});
`;

export const Doubts = styled.div`
  margin-bottom: 64px;

  h3 {
    margin-bottom: 16px;
  }
`;

export const Doubt = styled.div`
  display: flex;

  b + & {
    margin-top: 8px;
  }

  & + & {
    margin-top: 16px;
  }

  > div {
    margin-left: 8px;

    h6 {
      margin-bottom: 8px;
    }
  }
`;

export const DoubtBody = styled.div`
  display: grid;
  grid-template-columns: ${({ teacher }) => (teacher ? '1fr' : '1fr 100px')};
  position: relative;

  b {
    position: absolute;
    right: -8px;
    top: -8px;
  }

  > div {
    position: relative;
    margin-left: auto;

    > div {
      position: absolute;
      right: -8px;
      top: -8px;
    }
  }
`;

export const TakeDoubt = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;

  div {
    margin-left: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 8px;
    }
  }
`;

export const Subjects = styled.div`
  background: ${({ theme }) => theme.backgrounds.secondary};
  box-shadow: inset 0px 0px 5px
    ${({ theme }) => hexToRgba(theme.texts.primary, 0.2)};
  border-radius: 4px;
  height: fit-content;

  padding: 16px 0;

  h3 {
    margin: 0 32px 16px;
  }

  ul {
    list-style: none;
  }
`;

export const Subject = styled.li`
  height: 44px;
  padding: 8px 8px 8px 16px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s;

  :hover {
    background: ${({ theme }) => lighten(0.05, theme.backgrounds.secondary)};
  }

  :active {
    background: ${({ theme }) => lighten(0.1, theme.backgrounds.secondary)};
  }

  ${({ theme, disabled }) =>
    disabled &&
    css`
      color: ${theme.disabled};
      cursor: default;

      :hover {
        background: unset;
      }

      :active {
        background: unset;
      }
    `}
`;
