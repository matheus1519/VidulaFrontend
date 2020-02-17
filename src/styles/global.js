import { createGlobalStyle } from 'styled-components';
import { darken, lighten } from 'polished';

// #01103B Texto
// #032791
// #0434C4
// #4265CE
// #EBF2FF Fundo

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border:0;
    outline:0;
    box-sizing: border-box;
    font-family: 'Comfortaa', sans-serif;
    /* color: #01103B; */
    color: #EBF2FF
  }


  html,body,#root {
    height:100%;
  }


  body {
    background: linear-gradient(135deg, #01103B 0%, #032791 100%);
    -webkit-font-smothing: antialiased !important;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  input:focus {
    outline: 2px solid #4265CE;
    outline-offset: 0.5px;
    border-radius: 0;
    border: .5px solid ${darken(0.2, '#4265CE')} ;
  }

  input {
    background: #032791;
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
    width: 100%;
    padding: 15px 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    font-size: 13pt;
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

`;
