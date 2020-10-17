import { createGlobalStyle } from 'styled-components';

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
    text-decoration:none;
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
    color: ${({ theme }) => theme.texts.primary};
  }

  #root{
    max-width:1100px;
  }

  h1,h2,h3,h4,h5,h6{
    font-weight:normal;
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

  small{
    font-size:0.8rem;
    font-weight: 500;

  }

  hr{

  }

  button{
    cursor:pointer;
  }







`;
