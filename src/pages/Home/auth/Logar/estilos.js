import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

const appear = keyframes`
  from{
    transform:translateX(120px);
    opacity:0;
  }
  to{
    transform:translateX(0);
    opacity:100%;
  }
`;

export const Container = styled.div`
  & {
    animation: ${appear} linear 0.2s;
    width: 400px;
    border-radius: 5px;
    /* box-shadow: 0px 0px 10px 2px rgba(6, 77, 140, 0.534); */

    padding: 20px 20px 30px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      margin: 10px 0;
      width: 150px;
    }
    form {
      width: 100%;
      margin-top: 20px;
    }
    h2 {
      font-weight: bold;
    }
  }
`;

export const Button = styled.button.attrs(props => ({
  disabled: props.loading,
}))`
  &[disabled] {
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: not-allowed;
    background: ${lighten(0.3, '#0434C4')};
  }
  &[disabled]:hover {
    background: ${lighten(0.3, '#0434C4')};
  }
`;
