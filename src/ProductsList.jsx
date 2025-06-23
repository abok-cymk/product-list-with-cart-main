import { memo, useEffect, useState } from "react";

import { getProducts } from "./api/getProducts";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Heading from "./components/ui/Heading";
import Typography from "./components/ui/Typography";
import clsx from "clsx";
import { useCart } from "./context/CartContext";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import {
  handleAddToCart,
  handleIncrement,
  handleDecrement,
} from "./utils/cartQuantityHandlers";

const baseImagePath = import.meta.env.BASE_URL;

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    setQuantities((q) => {
      const cartIds = new Set(cartItems.map((item) => item.id));
      const next = { ...q };
      Object.keys(next).forEach((idx) => {
        if (!cartIds.has(Number(idx))) {
          delete next[idx];
        }
      });
      return next;
    });
  }, [cartItems]);

  if (error) {
    return (
      <div role="alert" className="text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, idx) => (
        <ProductCard key={product.name || idx} className="h-full">
          <picture>
            <source
              media="(min-width: 72rem)"
              srcSet={
                product.image?.desktop
                  ? `${baseImagePath}${product.image.desktop}`
                  : ""
              }
            />
            <source
              media="(min-width: 51rem)"
              srcSet={
                product.image?.tablet
                  ? `${baseImagePath}${product.image.tablet}`
                  : ""
              }
            />
            <img
              src={
                product.image?.mobile
                  ? `${baseImagePath}${product.image.mobile}`
                  : ""
              }
              alt={product.name}
              className={clsx(
                "w-full object-cover rounded",
                quantities[idx] ? "outline-3 outline-Red" : ""
              )}
            />
          </picture>
          <div className="relative">
            <Button
              className={clsx(
                "flex items-center px-4 py-2  space-x-2  whitespace-nowrap absolute -translate-y-1/2 left-1/2 -translate-x-1/2",
                quantities[idx]
                  ? "bg-Red gap-6 text-white font-semibold"
                  : "bg-white outline-1 outline-Rose-400"
              )}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!quantities[idx]) {
                  handleAddToCart({
                    idx,
                    products,
                    setQuantities,
                    addToCart,
                  });
                }
              }}
              tabIndex={0}
            >
              {quantities[idx] ? (
                <>
                  <CiCircleMinus
                    size={21}
                    aria-label="Descrease quantity"
                    onClick={() =>
                      handleDecrement({
                        idx,
                        products,
                        setQuantities,
                        addToCart,
                      })
                    }
                    className="justify-start"
                  />
                  <span>{quantities[idx]}</span>
                  <CiCirclePlus
                    size={21}
                    aria-label="Increase quantity"
                    onClick={() =>
                      handleIncrement({
                        idx,
                        products,
                        setQuantities,
                        addToCart,
                      })
                    }
                    className="justify-end"
                  />
                </>
              ) : (
                <>
                  <img src={`${baseImagePath}/icon-add-to-cart.svg`} alt="" />
                  <span className="text-sm font-semibold text-Rose-900">
                    Add to cart
                  </span>
                </>
              )}
            </Button>
            <div className="pt-7">
              <span className="text-sm text-Rose-300 font-semibold leading-0">
                {product.category}
              </span>
              <Heading as="h3" className="font-semibold">
                {product.name}
              </Heading>
              <Typography as="p" className="text-sm font-bold text-Red">
                ${product.price?.toFixed(2)}
              </Typography>
            </div>
          </div>
        </ProductCard>
      ))}
    </div>
  );
};

export default memo(ProductsList);
