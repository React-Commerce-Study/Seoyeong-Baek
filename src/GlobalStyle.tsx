import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
   ${reset}

   @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: var(--font-weight-light);
      font-style: normal;
   }

   :root{
      font-family: 'Pretendard-Regular';
      font-display: swap;
      /* colors */
      --point-color: #21BF48;
      --dark-gray-color:#767676;
      --middle-gray-color: #c4c4c4;
      --light-gray-color:#e0e0e0;

      /* font-size  */
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-md: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.5rem;
      --font-size-xxl: 2.25rem;

       /* font-weight   */
      --font-weight-light: 400;
      --font-weight-medium: 500;
      --font-weight-bold: 700;
      --font-weight-black: 800;
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
      width: 100%;
      vertical-align: top;
   }

   button {
      background:none;
      border:none;
      padding: 0px;
   }

   input{
      border:none;
      margin: 0;
   
      /* IE의 경우 */
      &::-ms-clear,
      &::-ms-reveal{
         display:none;
      }
      /* 크롬의 경우 */
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration{
         display:none;
      }

      /* 인풋 타입 숫자 입력시 number 버튼 없애기  */
      &::-webkit-inner-spin-button {
         appearance: none;
         -moz-appearance: none;
         -webkit-appearance: none;
      }
   }
   
   input, select{
   transition:all 0.3s ease-in;
   }
`;

export default GlobalStyle;
