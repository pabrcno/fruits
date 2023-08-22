import { createGlobalStyle } from "styled-components";
import Lobster from "../../assets/fonts/Lobster-Regular.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Lobster';
    src: url(${Lobster}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto; 
    
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #000;
    overflow-x: hidden;
    overflow-y: hidden;
    font-family: 'Lobster', cursive;
    cursor: none
  }
`;

export default GlobalStyle;
