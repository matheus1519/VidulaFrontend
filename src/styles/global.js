import { createGlobalStyle } from 'styled-components';
import { darken, lighten } from 'polished';

import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

// #01103B
// #032791
// #0434C4
// #4265CE
// #EBF2FF

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border:0;
    outline:0;
    box-sizing: border-box;
    font-family: 'Comfortaa', sans-serif;
    color: #EBF2FF
  }


  html,body,#root {
    width:100%;
    height:100vh;
  }


  body {
    background: linear-gradient(135deg, #01103B 0%, #032791 100%);
    -webkit-font-smothing: antialiased !important;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  input:focus {
    outline: 1px solid #4265CE;
    outline-offset: 0.5px;
    border-radius: 0;
    border: .5px solid ${darken(0.2, '#4265CE')} ;
  }

  input {
    background: #032791;
    width:100%;
    transition: 0.2s;
  }
  input:hover::placeholder {
    color: #EBF2FF;
  }
  input::placeholder {
    color: #EBF2FFa8;
  }

  input,
  button {
    padding: 15px 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    font-size: 14pt;
    color: #f0f2f2;
  }

  a {
    text-decoration: none;
    color: ${lighten(0.1, '#4265CE')};
  }
  a:hover {
    text-decoration: underline;
    color: ${lighten(0.2, '#4265CE')};
  }

  a:active {
    color: ${darken(0.2, '#4265CE')};
  }

  button.primario {
    margin-top: 5px;
    background: #0434C4;
    cursor: pointer;
    transition: 0.2s;
    font-weight: bold;
    height:51px;
  }

  button.primario:hover {
    background: ${lighten(0.2, '#0434C4')};
  }
  button.primario:active {
    background: ${darken(0.2, '#0434C4')};
  }

  button.secundario {
    margin-top: 5px;
    background: #4265CE;
    cursor: pointer;
    transition: 0.2s;
    font-weight: bold;
    height:51px;
  }

  button.secundario:hover {
    background: ${lighten(0.2, '#4265CE')};
  }
  button.secundario:active {
    background: ${darken(0.2, '#4265CE')};
  }
  .btn-primary, .btn-secondary {
    height:51px;
    font-size:14pt;
  }

  // #01103B Texto
  // #032791
  // #0434C4
  // #4265CE
  // #EBF2FF Fundo
  .f1-text {
    color:#EBF2FF;
  }
  .f2-text {
    color:#4265CE;
  }
  .f3-text {
    color:#0434C4;
  }
  .f4-text {
    color:#032791;
  }
  .f5-text {
    color:#01103B;
  }
  .f1-bg {
    background:#EBF2FF;
  }
  .f2-bg {
    background:#4265CE;
  }
  .f3-bg {
    background:#0434C4;
  }
  .f4-bg {
    background:#032791;
  }
  .f5-bg {
    background:#01103B;
  }

`;
