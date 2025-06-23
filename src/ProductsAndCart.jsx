import { Suspense, lazy } from "react";
import ProductsList from "./ProductsList";

const CartPage = lazy(() => import("./pages/CartPage"));

const ProductsAndCart = () => {
  return (
    <section className="max-w-7xl mx-auto gap-8 grid grid-cols-1 md:grid-cols-[1fr_300px] py-12 px-6">
      <div>
        <h2 className="font-bold text-4xl mb-4 text-Rose-900">Desserts</h2>
        <ProductsList />
      </div>
      <div>
        <Suspense
          fallback={
              <p>Loading Cart...</p>
          }
        >
          <CartPage />
        </Suspense>
      </div>
    </section>
  );
};

export default ProductsAndCart;
