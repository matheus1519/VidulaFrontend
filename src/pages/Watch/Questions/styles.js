import styled from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 4px);
  border-radius: 4px;
  padding: 16px 24px;

  background: ${({ theme }) => hexToRgba(theme.backgrounds.primary, 0.9)};
  box-shadow: inset 0px 0px 5px
    ${({ theme }) => hexToRgba(theme.texts.primary, 0.2)};
  z-index: 1;

  button {
    position: absolute;
    bottom: -74.4px;
    right: 0;
  }

  .MuiFormGroup-root {
    flex-direction: column;
    flex-wrap: unset;
    margin-top: 16px;
    margin-left: -11px;
    padding-left: 11px;
    overflow-y: auto;
    height: calc(100% - 77px);
  }
`;
