import React from "react";
import classNames from "classnames";
import "./index.css";

function Button({ type, disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames("btn", type, {
        "btn-disabled": disabled,
      })}
    >
      {props.children}
    </button>
  );
}

export default Button;
