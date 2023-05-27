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
   vertical-align: top;

 }

 button {
    background:none;
    border:none;
 }


`;

export default GlobalStyle;
