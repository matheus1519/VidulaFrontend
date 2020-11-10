import styled from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

export const Container = styled.textarea`
  overflow-y: hidden;
  appearance: none;
  resize: none;
  background: ${({ theme }) => hexToRgba(theme.texts.primary, 0.1)};
  color: ${({ theme }) => hexToRgba(theme.texts.primary)};
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid #171739;
  padding: 16px;
  width: ${({ fix }) => fix || '100%'};
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
    background: ${({ theme }) => hexToRgba(theme.warning, 0.4)};
  }
`;
