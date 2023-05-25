const { createGlobalStyle } = require('styled-components');
const { default: reset } = require('styled-reset');

const GlobalStyle = createGlobalStyle`
 ${reset}

 :root{
    --point-color: #21BF48;
  
 }

 li{
    list-style: none;
 }

 img{
   width: inherit;
 }

 button {
    background:none;
    border:none;
 }


`;

export default GlobalStyle;
