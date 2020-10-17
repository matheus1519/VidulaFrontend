import styled, { css } from 'styled-components';
import hexToRgba from '~/util/hexToRgba';
import Tooltip from '~/components/Tooltip';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => hexToRgba(theme.texts.primary, 0.1)};
  border-radius: 4px;
  border: 2px solid #171739;
  padding: 16px;
  width: ${({ fix }) => fix || '100%'};
  transition: 0.2s;
  cursor: text;

  margin-bottom: ${({ mb }) => `${mb}px`};

  svg {
    margin-right: 16px;
    color: ${({ theme }) => theme.disabled};
    transition: 0.2s;
  }

  :hover {
    > svg {
      color: ${({ theme }) => theme.texts.primary};
    }

    input::placeholder {
      color: ${({ theme }) => theme.texts.primary};
    }
  }

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: ${({ theme }) => theme.danger};
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${({ theme }) => theme.primary};
    `}

  ${({ isFilled, isFocused }) =>
    (isFilled || isFocused) &&
    css`
      svg {
        color: ${({ theme }) => theme.primary};
      }
      :hover {
        > svg {
          color: ${({ theme }) => theme.primary};
        }
      }
    `};



  input {
    flex: 1;
    background: transparent;
    font-size: 1rem;
    color: ${({ theme }) => theme.texts.primary};
    transition: 0.2s;

    :focus {
      border-color: ${({ theme }) => theme.primary};
    }

    :focus::placeholder {
      color: ${({ theme }) => theme.texts.primary};
    }

    :hover::placeholder {
      color: ${({ theme }) => theme.texts.primary};
    }

    ::placeholder {
      color: ${({ theme }) => theme.disabled};
    }

    ::selection {
      background: ${({ theme }) => hexToRgba(theme.texts.primary, 0.1)};
    }
  }
`;

export const Error = styled(Tooltip)`
  display: flex;
  align-items: center;
  margin-left: 16px;

  svg {
    margin: 0;
    color: ${({ theme }) => theme.danger};

    :hover {
      color: ${({ theme }) => theme.danger};
    }
  }
`;
