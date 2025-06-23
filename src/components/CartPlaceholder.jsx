const baseImagePath = import.meta.env.BASE_URL;
const CartPlaceholder = () => {
  return (
    <div className="flex flex-col items-center text-center mt-10">
      <img
        src={`${baseImagePath}/illustration-empty-cart.svg`}
        alt="Illustration empty cart"
      />
      <p>Your added items will appear here</p>
    </div>
  );
};

export default CartPlaceholder;
