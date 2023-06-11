import GlobalStyle from './GlobalStyle.jsx';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/SignUp.jsx';
import ProductDetails from './pages/ProductDetails.jsx';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}
export default App;
