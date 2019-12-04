import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    border:0;
    outline:0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    color: #064d8c;
  }


  html,body,#root {
    height:100%;
  }

  #root{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body {
    background: linear-gradient(135deg, #00a8ab 0%, #01b7ff 100%);
    -webkit-font-smothing: antialiased !important;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  input:focus {
    outline: 3px solid #26fbff;
    outline-offset: 0.5px;
    border-radius: 0;
    border: .5px solid #19a094;
  }

  input {
    background: #00a8ab;
    transition: 0.2s;
  }
  input:hover::placeholder {
    color: #f0f2f2;
  }
  input::placeholder {
    color: #f0f2f2a8;
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
    color: #00a8ab;
  }
  a:hover {
    text-decoration: underline;
  }

  button.primario {
    margin-top: 5px;
    background: #345ac3;
    cursor: pointer;
    transition: 0.2s;
    font-weight: bold;
    height:51px;
  }

  button.primario:hover {
    background: #3a6fff;
  }


`;
