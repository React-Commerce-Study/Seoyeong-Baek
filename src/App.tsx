import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Payment from './pages/Payment';
import NotFoundError from './pages/NotFoundError';
import SellerCenter from './pages/SellerCenter';
import PostProduct from './pages/PostProduct';
import EditProduct from './pages/EditProduct';
import styled from 'styled-components';
import PrivateRoute from './route/PrivateRoute';
import ProtectRoute from './route/ProtectRoute';

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
          <Route element={<ProtectRoute />}>
            <Route path="/seller/center" element={<SellerCenter />} />
            <Route path="/seller/post-product" element={<PostProduct />} />
            <Route path="/seller/edit/product" element={<EditProduct />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
        <Route path="/*" element={<NotFoundError />} />
      </Routes>
    </SLayout>
  );
}

const SLayout = styled.div`
  width: 100vw;
`;

export default App;
