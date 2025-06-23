import clsx from "clsx";
import { memo } from "react";

const Typography = ({ as: Tag = "p", className, children, ...props }) => {
  return (
    <Tag className={clsx(className)} {...props}>
      {children}
    </Tag>
  );
};

export default memo(Typography);
