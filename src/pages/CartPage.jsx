import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import CartPlaceholder from "../components/CartPlaceholder";
import { CiCircleRemove } from "react-icons/ci";
import Button from "../components/ui/Button";
import { useState } from "react";
import OrderModal from "../components/OrderModal";

const baseImagePath = import.meta.env.BASE_URL;

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cartItems]
  );

  const itemTotals = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        acc[item.id] = (item.quantity || 1) * item.price;
        return acc;
      }, {}),
    [cartItems]
  );

  const handleClearAll = () => {
    cartItems.forEach((item) => removeFromCart(item.id));
  };

  const handleStartNewOrder = () => {
    handleClearAll();
    setModalOpen(false);
  };

  return (
    <>
      <aside className="rounded-md bg-white p-6 shadow-2xl h-fit">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-Red">Your Cart ({cartCount})</h3>
          {cartItems.length > 0 && (
            <button
              className="underline text-sm decoration-1 decoration-Rose-300 capitalize cursor-pointer"
              onClick={handleClearAll}
            >
              clear cart
            </button>
          )}
        </div>
        {cartItems.length === 0 && <CartPlaceholder />}
        <div className="mt-4">
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between border-b border-Rose-100 py-2"
              >
                <div>
                  <h3 className="font-semibold text-sm pb-1">{item.name}</h3>
                  <p className="text-sm font-semibold">
                    <span className="text-Red pr-3">{item.quantity || 1}x</span>{" "}
                    <span className="text-Rose-400 pr-3">@ ${item.price}</span>
                    <span className="text-Rose-500">
                      ${itemTotals[item.id].toFixed(2)}
                    </span>
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.id)}>
                  <CiCircleRemove
                    size={20}
                    className="text-Rose-500 cursor-pointer"
                  />
                </button>
              </li>
            ))}
          </ul>

          {cartItems.length > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-Rose-400 font-semibold">Order Total</p>
              <p className="font-bold text-lg">${total.toFixed(2)}</p>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center w-full justify-center bg-Rose-100 rounded py-1.5 gap-2 mb-4">
                <img src={`${baseImagePath}/icon-carbon-neutral.svg`} alt="" />
                <p className="text-xs font-semibold text-Rose-400">
                  This is a{" "}
                  <strong className="text-black">carbon-neutral</strong>{" "}
                  delivery
                </p>
              </div>
              <Button
                className="text-sm bg-Red w-full text-Rose-50 py-2"
                onClick={() => setModalOpen(true)}
              >
                Confirm Order
              </Button>
            </div>
          )}
        </div>
      </aside>
      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onStartNewOrder={handleStartNewOrder}
      />
    </>
  );
};

export default CartPage;
