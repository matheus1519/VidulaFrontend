import styled from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

const width = 250;

export const Container = styled.div`
  background: ${({ theme, filled }) =>
    filled ? theme.success : theme.texts.secondary};
  width: ${width}px;
  height: ${width / 1.77}px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    box-shadow: 0 2px 4px 0 ${({ theme }) => hexToRgba(theme.primary, 0.6)};
  }

  svg {
    color: ${({ theme }) => theme.backgrounds.secondary};
  }
`;
