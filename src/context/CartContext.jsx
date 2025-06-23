import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (product.quantity === 0) {
          return prev.filter((item) => item.id !== product.id);
        }
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
    }),
    [cartItems, addToCart, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
