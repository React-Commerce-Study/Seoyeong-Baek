import GlobalStyle from './GlobalStyle.jsx';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main.jsx';
import ProductDetails from './pages/ProductDetails.jsx';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}
export default App;
