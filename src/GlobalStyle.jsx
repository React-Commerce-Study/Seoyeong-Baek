const { createGlobalStyle } = require('styled-components');
const { default: reset } = require('styled-reset');

const GlobalStyle = createGlobalStyle`
 ${reset}

 @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }

 :root{
    font-family: 'Pretendard-Regular';
    
    --point-color: #21BF48;
 }

 .a11y-hidden {
   clip: rect(1px, 1px, 1px, 1px);
   clip-path: inset(50%);
   width: 1px;
   height: 1px;
   margin: -1px;
   overflow: hidden;
   padding: 0;
   position: absolute;
 }

a{
    text-decoration: none;
    color: inherit;
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
