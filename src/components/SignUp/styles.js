import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    margin-bottom: 16px;
  }
`;
