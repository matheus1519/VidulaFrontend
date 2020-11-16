import styled from 'styled-components';
import { Form } from '@unform/web';

export const ModalContent = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 64px;

  > div {
    height: 100%;
  }

  h4 {
    margin-bottom: 24px;
  }

  div + h4 {
    margin-top: 32px;
  }

  textarea {
    height: 41%;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    margin-top: 40px;
  }
`;

export const StyledRadioText = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 8px;
  }

  div + div {
    margin-left: 16px;
    margin-right: -10px;
  }
`;

export const ModalContentAboutLesson = styled.div`
  h4 {
    margin-bottom: 16px;
  }

  div + h4 {
    margin-top: 32px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Divider = styled.hr`
  margin: 24px 0 16px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  justify-items: center;
  margin-bottom: 64px;
`;
