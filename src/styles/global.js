import { createGlobalStyle } from 'styled-components';
import { darken, desaturate } from 'polished';
import hexToRgba from '~/util/hexToRgba';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border:0;
    outline:0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    color: #EBF2FF
  }

  html{
    font-size:16px;
  }

  html,body,#root {
    width:100%;
    height:100%;
  }

  body {
    background: ${({ theme }) => theme.backgrounds.primary};
    -webkit-font-smothing: antialiased !important;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  #root{
    max-width:1100px;
  }

  h1{
    font-size:2.986rem;
  }

  h2{
    font-size:2.488rem;
  }

  h3{
    font-size:2.074rem;
  }

  h4{
    font-size:1.728rem;
  }

  h5{
    font-size:1.44rem;
  }

  h6{
    font-size:1.2rem;
  }

  p{
    font-family: 'Comfortaa',serif;
    font-size:1rem;
  }

  hr{

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




`;
