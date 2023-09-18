import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Payment from './pages/Payment';
import styled from 'styled-components';
import PrivateRoute from './route/PrivateRoute';

function App() {
  return (
    <SLayout>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </SLayout>
  );
}

const SLayout = styled.div`
  /* padding: 0 1em; */
`;

export default App;
