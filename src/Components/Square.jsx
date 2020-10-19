import React from "react";

export default function Square(props) {
  return (
    <button
      className={`btn btn-outline-${props.outline ? 'danger':'dark'} btn-ne`}
      onClick={() => props.onClick()}
      {...props}
    >
      {props.value}
    </button>
  );
}
