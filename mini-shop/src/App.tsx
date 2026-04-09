import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Cart from "./pages/cart/Cart";
import CategoryPage from "./pages/category/CategoryPage";
import Home from "./pages/home/Home";
import ProductDetail from "./pages/product-detail/ProductDetail";
import Wishlist from "./pages/wishlist/Wishlist";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App;
