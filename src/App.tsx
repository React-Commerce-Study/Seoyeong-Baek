import GlobalStyle from './GlobalStyle';
import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Payment from 'pages/Payment';
import styled from 'styled-components';

function App() {
  return (
    <RecoilRoot>
      <SLayout>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </SLayout>
    </RecoilRoot>
  );
}

const SLayout = styled.div`
  /* padding: 0 1em; */
`;

export default App;
