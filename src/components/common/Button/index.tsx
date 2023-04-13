import React from "react";
import "./Button.scss";

interface Props {
  type: "button" | "submit",
  children: React.ReactNode,
  form?: boolean,
  onClick?: () => void
}

export const Button: React.FC<Props> = ({type, children, form, onClick}) => {
  return (
    <button
      className={`button ${form ? "button-form" : ''}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}