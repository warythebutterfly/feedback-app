import React from "react";
import PropTypes from "prop-types";

function Button({ children, version, type, isDisabled, float }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`} style={{float: float}}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: "primary",
  isDisabled: false,
  type: "button",
};
Button.propTypes = {
  children : PropTypes.node.isRequired,
  isDisabled : PropTypes.bool,
  version : PropTypes.string,
  type: PropTypes.string,
};
export default Button;
