import clsx from "clsx";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

const ProductCard = forwardRef(
  (
    { className, children, productPage, as: Component = "article", ...props },
    ref
  ) => {
    const content = (
      <Component
        ref={ref}
        className={clsx(className)}
        tabIndex={productPage ? undefined : 0}
        {...props}
      >
        {children}
      </Component>
    );
    return productPage ? (
      <Link to={productPage} aria-label="View produc details" tabIndex={0}>
        {content}
      </Link>
    ) : (
      content
    );
  }
);

export default ProductCard;
