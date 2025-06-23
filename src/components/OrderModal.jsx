import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import Heading from "../components/ui/Heading";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";

const baseImagePath = import.meta.env.BASE_URL;

const OrderModal = ({ open, onClose, onStartNewOrder }) => {
  const { cartItems } = useCart();

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      ),
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

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <dialog
        open
        className="bg-white rounded-md p-4 z-50 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl min-w-[320px] md:min-w-[420px] max-w-[90vw]"
        style={{ border: "none" }}
      >
        <img
          src={`${baseImagePath}/icon-order-confirmed.svg`}
          alt=""
          className="h-8 mb-2"
        />
        <Heading as="h2" className="font-bold text-2xl">
          Order Confirmed
        </Heading>
        <Typography as="p" className="text-sm text-Rose-500">
          We hope you enjoy your food
        </Typography>
        <ul className="bg-Rose-50 p-4 rounded-md divide-y divide-Rose-100 mt-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-4"
            >
              <div className="flex gap-2 items-center">
                <img
                  src={`${baseImagePath}/${item.image?.mobile || ""}`}
                  alt={item.name}
                  className="h-10 w-10 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-sm pb-1">{item.name}</h3>
                  <p className="text-sm font-semibold">
                    <span className="text-Red pr-3">{item.quantity || 1}x</span>{" "}
                    <span className="text-Rose-400 pr-3">@ ${item.price}</span>
                  </p>
                </div>
              </div>
              <span className="text-black text-sm font-bold">
                ${itemTotals[item.id].toFixed(2)}
              </span>
            </li>
          ))}
          <li>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-Rose-400 font-semibold">Order Total</p>
              <p className="font-bold text-lg">${total.toFixed(2)}</p>
            </div>
          </li>
        </ul>

        <Button
          onClick={onStartNewOrder}
          className="text-sm bg-Red w-full text-Rose-50 py-2 mt-4"
        >
          Start New Order
        </Button>
      </dialog>
    </>
  );
};

export default OrderModal;
