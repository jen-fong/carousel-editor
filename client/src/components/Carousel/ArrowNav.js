import React from "react";
import classNames from "classnames";
import "./ArrowNav.css";

function ArrowNav({ handleClick, disabled, direction }) {
  return (
    <button
      className={classNames(`arrow-control arrow-control__${direction}`, {
        "arrow-control--disabled": disabled,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={`arrow arrow__${direction}`}></span>
    </button>
  );
}

export default ArrowNav;
