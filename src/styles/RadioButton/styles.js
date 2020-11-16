import styled from 'styled-components';

export const ContainerRadio = styled.div`
  .MuiRadio-colorSecondary.Mui-checked {
    color: ${({ theme }) => theme.primary};
  }

  .MuiRadio-root {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ContainerLabel = styled.div`
  .MuiTypography-body1 {
    font-size: 1.44rem;
    color: ${({ theme, checked }) =>
      checked ? theme.primary : theme.disabled};
  }

  .MuiFormControlLabel-root {
    margin-right: ${({ label }) => (label ? 16 : 0)}px;
  }
`;
