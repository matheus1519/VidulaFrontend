import styled from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

export const Container = styled.div`
  position: relative;

  :hover small {
    opacity: 1;
    visibility: visible;
  }

  small {
    box-shadow: 2px 2px 4px 0
      ${({ theme, error }) =>
        hexToRgba(error ? theme.danger : theme.texts.primary, 0.6)};
    width: max-content;
    background: ${({ theme, error }) => (error ? theme.danger : theme.primary)};
    color: ${({ theme, error }) =>
      error ? theme.texts.primary : theme.backgrounds.primary};
    padding: 8px;
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    ::before {
      content: '';
      border-style: solid;
      border-color: ${({ theme, error }) =>
          error ? theme.danger : theme.primary}
        transparent;
      border-width: 6px 6px 0 6px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;
