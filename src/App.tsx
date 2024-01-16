import { Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartEx from "pages/CartEx";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import Cart from "./pages/Cart";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFoundError from "./pages/NotFoundError";
import Payment from "./pages/Payment";
import PostProduct from "./pages/PostProduct";
import ProductDetails from "./pages/ProductDetails";
import SellerCenter from "./pages/SellerCenter";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./route/PrivateRoute";
import ProtectRoute from "./route/ProtectRoute";
import Signupex from "pages/Signupex";

const queryClient = new QueryClient({
  /* options */
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SLayout>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* 연습용 */}
          <Route path="/signupex" element={<Signupex />} />
          <Route path="/cart-ex" element={<CartEx />} />

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const SLayout = styled.div`
  width: 100vw;
`;

export default App;
