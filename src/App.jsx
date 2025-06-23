import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ProductsAndCart from "./ProductsAndCart";

const App = () => {
  return (
    <CartProvider>
        <main>
          <h1 className="sr-only">Product lists with cart</h1>
          <Routes>
            <Route path="/" element={<ProductsAndCart />} />
          </Routes>
        </main>
    </CartProvider>
  );
}

export default App;
