import clsx from "clsx";
import { memo } from "react";

const Button = ({ type = "button", className, children, ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className={clsx(
        "justify-center cursor-pointer text-lg rounded-full",
        className
      )}
    >
      {children}
    </button>
  );
};

export default memo(Button);
