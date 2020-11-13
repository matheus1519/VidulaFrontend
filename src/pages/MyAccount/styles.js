import styled from 'styled-components';
import { lighten, shade } from 'polished';

import { Form } from '@unform/web';

import hexToRgba from '~/util/hexToRgba';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;

  p {
    margin-top: 16px;
  }

  button {
    margin-top: 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Divider = styled.hr`
  margin: 24px 0 16px;
`;

export const Person = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  div + div {
    margin-left: 32px;
  }
`;

export const AvatarClickable = styled.div`
  position: relative;
  cursor: pointer;

  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    display: flex;
    align-items: center;
    transition: 0.2s;
    justify-content: center;

    svg {
      opacity: 0;
      transition: 0.2s;
      color: ${({ theme }) => theme.primary};
    }
  }

  :hover {
    svg {
      opacity: 1;
      color: ${({ theme }) => shade(0.2, theme.primary)};
    }

    div {
      background: ${({ theme }) => hexToRgba(theme.texts.primary, 0.7)};
    }
  }

  :active {
    div {
      background: ${({ theme }) => shade(0.3, hexToRgba(theme.primary, 0.7))};
    }
    svg {
      color: ${({ theme }) => lighten(0.05, theme.primary)};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  margin-bottom: 32px;

  > div {
    background: ${({ theme }) => theme.backgrounds.secondary};
    box-shadow: inset 0px 0px 5px
      ${({ theme }) => hexToRgba(theme.texts.primary, 0.2)};
    border-radius: 4px;
    height: fit-content;

    padding: 16px 24px;
  }

  > div + div {
    margin-left: 32px;
  }
`;

export const SectionTitle = styled.h3`
  margin-left: 16px;
  margin-bottom: 24px;
`;

export const ChangePassword = styled.div`
  div + div {
    margin-top: 16px;
  }
`;

export const AboutYou = styled.div`
  padding-right: 8px !important;

  > div + div {
    margin-top: 24px;
  }
`;

export const FormStyled = styled(Form)`
  margin-top: 8px;
  margin-right: 16px;

  div {
    background: transparent;
    padding: 0;

    :hover {
      background: ${({ theme }) => hexToRgba(theme.texts.primary, 0.1)};
      padding: 16px;
    }
  }
`;

export const Teacher = styled.div`
  h4 {
    margin-bottom: 16px;
  }
`;

export const DateStyled = styled.div`
  margin-top: 8px;

  input {
    ::-webkit-calendar-picker-indicator {
      filter: invert(1);
      outline: none;
    }
  }

  .MuiInputBase-root {
    color: ${({ theme }) => theme.primary};
  }

  .MuiInput-underline::before {
    border-color: ${({ theme }) => hexToRgba(theme.texts.primary, 0.42)};
    transition: 0.2s;
  }

  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-color: ${({ theme }) => hexToRgba(theme.texts.primary, 0.42)};
  }
  .MuiInput-underline:after {
    border-color: ${({ theme }) => theme.primary};
  }
`;
