import PropTypes from "prop-types";
import { memo } from "react";

const Heading = ({ as: Tag = "h1", className, children, ...props }) => (
  <Tag className={className} {...props}>
    {children}
  </Tag>
);

Heading.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default memo(Heading);
