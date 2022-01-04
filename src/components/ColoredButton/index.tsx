import React from "react";

export default function ColoredButton(props) {
  const style = props.stylec !== undefined ? " " + props.stylec : "";
  return (
    <button
      type={props.type ? props.type : "button"}
      className={"bg-[#FFE6EB] rounded-full text-[#242429] px-4 py-2" + style}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </button>
  );
}
